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
      environmental
    } = this.props;

    const scores = [
      { progress: social, label: 'Social' },
      { progress: environmental, label: 'Environmental' },
      { progress: currency, label: '$' }
    ];

    return (
      <div className="flex-parent flex-parent--end-main flex-parent--wrap w600">
        {scores.map(s => (
          <div className="flex-child">
            <ProgressBar
              label={s.label}
              className="w300"
              barClassName="bg-gray-light"
              progress={s.progress}
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
