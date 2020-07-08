'use strict';

const locales = {
  'hot dry': 'hd',
  'hot humid': 'hh',
  'temperate': 't'
};

const initialState = {
  locale: locales['hot dry']
};

export function reducer(state = initialState, action) {
  return state;
}
