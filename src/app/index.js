'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Game } from './game';
import { Locales } from '../locales';
import { boardSelectors } from '../store/board-selectors';

let App = class App extends React.PureComponent {
  render() {
    const { locale } = this.props;
    return (
      <div className="scroll-hidden relative viewport-fill">
        {locale ? <Game /> : <Locales />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locale: boardSelectors.locale(state)
});

App = connect(
  mapStateToProps
)(App);

export { App };
