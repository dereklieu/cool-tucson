'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { scoreSelectors } from '../store/score-selectors';
import { ProgressBar } from './progress-bar';

let Score = class Score extends React.PureComponent {
  render() {
    const {
      currency,
      social,
      environmental,
      winScore
    } = this.props;

    const scores = [
      { progress: social, label: 'Social' },
      { progress: environmental, label: 'Environmental' },
      { progress: currency, label: '$' }
    ];

    return (
      <div className="flex-parent flex-parent--end-main flex-parent--wrap w600">
        {scores.map((s, i) => (
          <div className="flex-child" key={s.label}>
            <ProgressBar
              label={s.label}
              className="w300"
              progress={s.progress}
              winScore={i === 2 ? undefined : winScore}
            />
          </div>
        ))}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  currency: scoreSelectors.currency(state),
  social: scoreSelectors.socialScore(state),
  environmental: scoreSelectors.environmentalScore(state),
  winScore: scoreSelectors.winScore(state)
});

Score = connect(
  mapStateToProps
)(Score);

export { Score };
