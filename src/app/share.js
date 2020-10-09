'use strict';
import React from 'react';
import { get } from 'object-path-immutable';
import { connect } from 'react-redux';
import { boardActionCreators } from '../store/board-action-creators';
import { decode } from '../util/encode';

let Share = class Share extends React.PureComponent {
  componentDidMount() {
    const { match, syncInitialState, history } = this.props;
    const encoded = get(match, 'params.encoded');
    if (encoded) {
      const state = decode(encoded);
      if (state) {
        syncInitialState(state);
      }
      history.push('/');
    }
  }

  render() {
    return null;
  }
}

const mapDispatch = {
  syncInitialState: boardActionCreators.syncInitialState
};

Share = connect(null, mapDispatch)(Share);
export { Share };
