'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { boardSelectors } from '../store/board-selectors';
import { ActiveBadge } from './active-badge';
import { badges } from './badges';

let Badges = class Badges extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
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
      const next = badges.slice(prevProps.length);
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

  renderExpanded() {
    return null;
  }

  render() {
    const { isExpanded, active } = this.state;
    return (
      <div className="relative">
        {isExpanded && this.renderExpanded()}
        {active.map((badge, i) => (
          <ActiveBadge
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
