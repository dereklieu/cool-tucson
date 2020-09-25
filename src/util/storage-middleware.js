'use strict';
import { get, set, merge } from 'object-path-immutable';

const storageTest = () => {
  const test = 'test';
  try {
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

const hasStorage = storageTest();

export const getStorageState = (key, path, baseState) => {
  let data;
  if (hasStorage) {
    const item = window.localStorage.getItem(key);
    console.log(!!item);
    data = item ? JSON.parse(item) : null;
  } else {
    data = null;
  }
  return merge(
    baseState,
    [],
    set({}, path, data)
  );
}

export const createStorageMiddleware = (key, path, actionType) => {
  return (store) => (next) => (action) => {
    const result = next(action);
    if (action.type === actionType && hasStorage) {
      const value = get(store.getState(), path);
      window.localStorage.setItem(key, JSON.stringify(value));
    }
    return result;
  };
}
