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
      {
        progress: social,
        barClassName: social > winScore
        ? 'bg-blue-dark'
        : 'bg-blue-light',
        label: 'Social score'
      },
      {
        progress: environmental,
        barClassName: environmental > winScore
        ? 'bg-green-dark'
        : 'bg-green-light',
        label: 'Environmental score'
      }
    ];

    return (
      <div className="flex-parent flex-parent--start-cross flex-parent--center-main color-white">
        <div className="flex-child">
          <ProgressBar
            label="Resources remaining"
            barClassName="bg-red-light"
            progress={currency}
          />
        </div>
        {scores.map((s, i) => (
          <div key={s.label} className="flex-child ml30">
            <ProgressBar
              label={s.label}
              barClassName={s.barClassName}
              progress={s.progress}
              winScore={winScore}
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
