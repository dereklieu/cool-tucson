'use strict';
import { combineReducers, createStore } from 'redux';
import { reducer as setting } from './setting-reducer';
import { reducer as intervention } from './intervention-reducer';
import { reducer as board } from './board-reducer';

const reducers = combineReducers({
  setting,
  intervention,
  board
});

export const store = createStore(reducers);
