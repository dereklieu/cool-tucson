'use strict';
import * as immutable from 'object-path-immutable';

const locales = {
  'hot dry': 'hd',
  'hot humid': 'hh',
  'temperate': 't'
};

const initialState = {
  locale: locales['hot dry']
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_LOCALE':
      return immutable.set(state, 'locale', action.locale);
  }
  return state;
}
