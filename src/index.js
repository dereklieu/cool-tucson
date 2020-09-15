'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { App } from './app/index.js';

require('./assets/lib/assembly/assembly.min.css');
require('./assets/lib/assembly/assembly.js');
require('./assets/css/base.css');

ReactDOM.render(
  (
    <Provider store={store}><App /></Provider>
  ),
  document.getElementById('app')
);
