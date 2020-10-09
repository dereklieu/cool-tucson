'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { scoreSelectors } from '../store/score-selectors';
import { ProgressBar } from './progress-bar';
import constants from '../constants';

const SCORE_PADDING = 1.1;

let Score = class Score extends React.PureComponent {
  render() {
    const {
      currency,
      social,
      environmental,
      hasWon
    } = this.props;

    const scores = [
      {
        score: social,
        barClassName: hasWon
        ? 'bg-blue-light'
        : 'bg-blue-dark',
        label: 'Social score',
        tip: constants.SCORE_SOCIAL
      },
      {
        score: environmental,
        barClassName: hasWon
        ? 'bg-green-light'
        : 'bg-green-dark',
        label: 'Environmental score',
        tip: constants.SCORE_ENVIRO
      }
    ];

    return (
      <div className="flex-parent flex-parent--start-cross flex-parent--center-main color-white">
        <div className="flex-child" data-tip={constants.SCORE_CURRENCY}>
          <ProgressBar
            label="Resources remaining"
            barClassName="bg-red-light"
            score={currency}
            max={constants.INITIAL_CURRENCY}
          />
        </div>
        {scores.map((s, i) => (
          <div key={s.label} className="flex-child ml30" data-tip={s.tip}>
            <ProgressBar
              label={s.label}
              barClassName={s.barClassName}
              score={s.score}
              threshold={s.threshold}
              max={constants.SOCIAL_WIN_SCORE * SCORE_PADDING}
            />
          </div>
        ))}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  currency: scoreSelectors.currency(state),
  social: scoreSelectors.social(state),
  environmental: scoreSelectors.environmental(state),
  hasWon: scoreSelectors.hasWon(state)
});

Score = connect(
  mapStateToProps
)(Score);

export { Score };
