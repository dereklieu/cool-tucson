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
      environmental
    } = this.props;

    const scores = [
      {
        score: social,
        barClassName: social >= constants.SOCIAL_WIN_SCORE
        ? 'bg-blue-light'
        : 'bg-blue-dark',
        label: 'Social score',
        threshold: 100 / SCORE_PADDING
      },
      {
        score: environmental,
        barClassName: 'bg-green-dark',
        label: 'Environmental score'
      }
    ];

    return (
      <div className="flex-parent flex-parent--start-cross flex-parent--center-main color-white">
        <div className="flex-child">
          <ProgressBar
            label="Resources remaining"
            barClassName="bg-red-light"
            score={currency}
            max={constants.INITIAL_CURRENCY}
          />
        </div>
        {scores.map((s, i) => (
          <div key={s.label} className="flex-child ml30">
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
  environmental: scoreSelectors.environmental(state)
});

Score = connect(
  mapStateToProps
)(Score);

export { Score };
