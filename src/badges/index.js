'use strict';
import React from 'react';
import c from 'classnames';
import { connect } from 'react-redux';
import { boardSelectors } from '../store/board-selectors';
import { ActiveBadge } from './active-badge';
import { badges } from './badges';
import { IconLabel } from '../indicators/icon-label';

let Badges = class Badges extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: []
    };
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate(prevProps) {
    const { badges } = this.props;
    if (badges.length > prevProps.badges.length) {
      const next = badges.slice(prevProps.badges.length);
      this.setState(state =>
        ({ active: state.active.concat(next) })
      );
    }
  }

  removeActive = (title) => {
    this.setState(state =>
      ({ active: state.active.filter((b) => b.title !== title) })
    );
  }

  renderToggle() {
    const containerClass = c(
      'cursor-pointer mt6 transition',
      'flex-parent flex-parent--column flex-parent--center-main',
      'absolute right w60 h60 shadow-darken10',
      'border-t border-l border-b',
      'round-t round-l round-b',
      'bg-white bg-green-light-on-hover'
    );
    const containerStyle = {
      lineHeight: '60px'
    };
    return (
      <div className={containerClass} style={containerStyle}>
        <IconLabel
          icon="star"
          size={36}
          className="flex-parent flex-parent--center-main"
        />
      </div>
    );
  }

  render() {
    const {  active } = this.state;
    return (
      <div className="relative">
        {active.map((badge, i) => (
          <ActiveBadge
            index={i}
            key={badge.title}
            badge={badge}
            onRemove={this.removeActive}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  badges: boardSelectors.badges(state)
});

Badges = connect(mapStateToProps)(Badges);
export { Badges };
