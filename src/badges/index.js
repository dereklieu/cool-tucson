'use strict';
import React from 'react';
import c from 'classnames';
import { connect } from 'react-redux';
import { boardSelectors } from '../store/board-selectors';
import { ActiveBadge } from './active-badge';
import { IconLabel } from '../indicators/icon-label';
import { Modal } from '../indicators/modal';
import constants from '../constants';
import { allOutcomes } from '../interventions/interventions';

let Badges = class Badges extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: [],
      showOutcomes: false
    };
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate(prevProps) {
    const { outcomes } = this.props;
    if (outcomes.length > prevProps.outcomes.length) {
      const next = outcomes.slice(prevProps.outcomes.length);
      this.setState(state =>
        ({ active: state.active.concat(next) })
      );
    }
  }

  toggleShowOutcomes = () => this.setState(state => ({ showOutcomes: !state.showOutcomes }));

  removeActive = (outcome) => {
    this.setState(state =>
      ({ active: state.active.filter((b) => b !== outcome) })
    );
  }

  renderCount() {
    const containerClass = c(
      'absolute right w60 h60 mt6 cursor-pointer',
      'align-center align-middle',
      'border-t border-l border-b',
      'round-t round-l round-b',
      'shadow-darken10',
      'btn btn--white color-black'
    );
    const containerStyle = {
      lineHeight: '60px'
    };
    const displayStyle = {
      bottom: '-3px',
      right: '-3px'
    };
    const count = this.props.outcomes.length;
    return (
      <button
        className={containerClass}
        style={containerStyle}
        onClick={this.toggleShowOutcomes}
      >
        <div className="relative">
          <IconLabel
            icon="star"
            size={24}
            className="inline-block color-yellow"
          />
          <span className="absolute txt-bold" style={displayStyle}>
            {count}
          </span>
        </div>
      </button>
    );
  }

  renderOutcome = (outcome) => {
    const { outcomes } = this.props;
    const isAchieved = outcomes.indexOf(outcome) >= 0;
    const className = c(
      'px6 py6 border round align-center mb12 relative',
      {
        opacity50: !isAchieved,
        opacity100: isAchieved
      }
    );
    return (
      <li key={outcome} className={className}>
        <p className="txt-l txt-bold mb3">{outcome}</p>
        <p className="txt-s">{isAchieved ? 'Achieved!' : 'Not yet achieved'}</p>

        { isAchieved ? (
          <div className="absolute top left ml12 mt12 color-yellow">
            <IconLabel
              icon="star"
              size={24}
            />
          </div>
        ) : null }
      </li>
    );
  }

  renderOutcomes() {
    return (
      <>
        <ul style={{ listStyle: 'none' }} className="mt12">
          {[...allOutcomes].map(this.renderOutcome)}
        </ul>
      </>
    );
  }

  render() {
    const { showOutcomes, active } = this.state;
    return (
      <>
        <div className="relative">
          {this.renderCount()}
          {active.map((outcome, i) => (
            <ActiveBadge
              index={i}
              key={outcome}
              outcome={outcome}
              onRemove={this.removeActive}
            />
          ))}
        </div>
        {showOutcomes ? (
          <Modal onExit={this.toggleShowOutcomes}>
            <div className="py24 px24 round shadow shadow-darken10">
              <div className="prose txt-l">
                <p>Improvements have <strong>other benefits</strong> besides keeping things chill.</p>
                <p>Here are some positive vibes from the improvements you've made so far:</p>
              </div>
              {this.renderOutcomes()}
            </div>
          </Modal>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = state => ({
  outcomes: boardSelectors.outcomes(state)
});

Badges = connect(mapStateToProps)(Badges);
export { Badges };
