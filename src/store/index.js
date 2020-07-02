'use strict';
import { combineReducers, createStore } from 'redux';
import { reducer as board } from './board-reducer';

const reducers = combineReducers({
  board
});

export const store = createStore(reducers);
