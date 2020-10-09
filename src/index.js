'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { store } from './store';
import { App } from './app';
import { Share } from './app/share';

require('./assets/lib/assembly/assembly.min.css');
require('./assets/lib/assembly/assembly.js');
require('./assets/css/base.css');

ReactDOM.render(
  (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route
            path="/share/:encoded"
            render={props => <Share {...props} />}
          />
          <Route exact path="/">
            <App />
          </Route>
        </Switch>
      </HashRouter>
    </Provider>
  ),
  document.getElementById('app')
);
