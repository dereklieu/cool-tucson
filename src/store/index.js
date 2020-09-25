'use strict';
import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose
} from 'redux';
import { reducer as intervention } from './intervention-reducer';
import {
  initialState as boardInitialState,
  reducer as board
} from './board-reducer';
import { getStorageState, createStorageMiddleware } from '../util/storage-middleware';

const key = 'chill-city-locale-preference';
const path = ['board', 'locale'];

const storageMiddleware = createStorageMiddleware(key, path, 'CHANGE_LOCALE');
const baseState = { board: boardInitialState };
const initialState = getStorageState(key, path, baseState);

const reducers = combineReducers({
  intervention,
  board
});

export const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(storageMiddleware))
);
