'use strict';
import React from 'react';
import c from 'classnames';
import { px } from '../util/style-util';
import { IconLabel } from '../indicators/icon-label';

export class ActiveBadge extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      phase: 'pre'
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ phase: 'open' }), 50);
  }

  componentDidUpdate(_, prevState) {
    const { phase } = this.state;
    if (phase === prevState.phase) return;

    if (phase === 'open') {
      setTimeout(() => this.setState({ phase: 'post' }), 3000);
    } else if (phase === 'post') {
      setTimeout(() => this.props.onRemove(this.props.outcome), 200);
    }
  }

  render() {
    const { phase } = this.state;
    const { index, outcome } = this.props;
    const containerStyle = {
      transition: '300ms all',
      top: px(-index * 70 - 70)
    };

    switch (phase) {
      case 'post':
      case 'pre':
        containerStyle.left = px(360);
        break;
      case 'open':
        containerStyle.left = px(-360);
        break;
    }

    const containerClass = c(
      'absolute w360 bg-white shadow-darken10',
      'border-t border-l border-b',
      'round-t round-l round-b shadow'
    );
    return (
      <div className={containerClass} style={containerStyle}>
        <div className="my12 mx12">
          <div className="flex-parent flex-parent--center-cross mb6">
            <IconLabel icon="star" size={24} className="flex-child mr6 color-yellow" />
            <h4 className="flex-child txt-h4 txt-bold">
              {outcome}
            </h4>
          </div>
        </div>
      </div>
    );
  }
};
