'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { scoreSelectors } from '../store/score-selectors';
import { badges } from './badges';

let Badges = class Badges extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // Detect changes to props;
    // Also set timer to reset state.
  }

  render() {
    return <div />;
  }
}

const mapStateToProps = state => ({
  social: scoreSelectors.social(state),
  environmental: scoreSelectors.environmental(state)
});

Badges = connect(mapStateToProps)(Badges);
export { Badges };
