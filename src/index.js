'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/index.js';

require('./assets/lib/assembly/assembly.min.css');
require('./assets/lib/assembly/assembly.js');

ReactDOM.render(<App />, document.getElementById('app'));
