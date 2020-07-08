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

    return (
      <div className="flex-parent flex-parent--center-main flex-parent--center-cross">
        <div className="flex-child mx12">
          Social: {social}
        </div>
        <div className="flex-child mx12">
          Environmental: {environmental}
        </div>
        <div className="flex-child ml12 mr6">$</div>
        <div className="flex-child w300">
          <ProgressBar
            barClassName="bg-gray-light"
            progress={currency}
          />
        </div>
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
