'use strict';
import { combineReducers, createStore } from 'redux';
import { reducer as board } from './board-reducer';
import { reducer as score } from './score-reducer';

const reducers = combineReducers({
  board,
  score
});

export const store = createStore(reducers);
