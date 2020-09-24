'use strict';
import { combineReducers, createStore } from 'redux';
import { reducer as intervention } from './intervention-reducer';
import { reducer as board } from './board-reducer';

const reducers = combineReducers({
  intervention,
  board
});

export const store = createStore(reducers);
