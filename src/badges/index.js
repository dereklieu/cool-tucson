'use strict';
import React from 'react';
import c from 'classnames';
import { connect } from 'react-redux';
import { boardSelectors } from '../store/board-selectors';
import { ActiveBadge } from './active-badge';
import { badges } from './badges';
import { IconLabel } from '../indicators/icon-label';
import constants from '../constants';

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

  renderCount() {
    const containerClass = c(
      'absolute right w60 h60 mt6',
      'align-center align-middle',
      'cursor-default',
      'border-t border-l border-b',
      'round-t round-l round-b',
      'shadow-darken10 bg-white'
    );
    const containerStyle = {
      lineHeight: '60px'
    };
    const count = this.props.badges.filter(b => b.isPassed).length;
    return (
      <div
        className={containerClass}
        style={containerStyle}
      >
        <IconLabel
          icon="star"
          size={24}
          className="inline-block"
        />
        <span className="inline-block">
          {count}
        </span>
      </div>
    );
  }

  render() {
    const {  active } = this.state;
    return (
      <div className="relative">
        {this.renderCount()}
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
