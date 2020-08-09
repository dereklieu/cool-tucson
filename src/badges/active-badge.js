'use strict';
import React from 'react';
import c from 'classnames';

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
      setTimeout(() => this.setState({ phase: 'post' }), 2000);
    } else if (phase === 'post') {
      setTimeout(() => this.props.onRemove(this.props.badge.title), 200);
    }
  }

  render() {
    const { phase } = this.state;
    const containerStyle = {};
    switch (phase) {
      case 'pre':
        containerStyle.left = '300px';
        break;
      case 'open':
        containerStyle.left = '-336px';
        break;
      case 'post':
        containerStyle.left = '300px';
        break;
    }

    const containerClass = c(
      'absolute border round w300 mr36 transition'
    );


    const { badge } = this.props;
    return (
      <div className={containerClass} style={containerStyle}>
        <div className="mx24 my24 prose">
          <h4 className="txt-h4">{badge.title}</h4>
          <p>{badge.description}</p>
        </div>
      </div>
    );
  }
};
