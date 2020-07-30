'use strict';
import { combineReducers, createStore } from 'redux';
import { reducer as setting } from './setting-reducer';
import { reducer as board } from './board-reducer';

const reducers = combineReducers({
  setting,
  board
});

export const store = createStore(reducers);
