'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Game } from './game';
import { Locales } from '../locales';
import { settingSelectors } from '../store/setting-selectors';

let App = class App extends React.PureComponent {
  render() {
    const { locale } = this.props;
    // TODO: implement locales
    if (!locale && false) return <Locales />;
    return <Game />;
  }
}

const mapStateToProps = state => ({
  locale: settingSelectors.locale(state)
});

App = connect(
  mapStateToProps
)(App);

export { App };
