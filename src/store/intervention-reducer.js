'use strict';
import * as immutable from 'object-path-immutable';

const initialState = {
  active: '',
  dragging: ''
};

export function reducer(state = initialState, action) {
  switch(action.type) {
    case 'INTERVENTION_SET':
      return immutable.set(state, 'active', action.intervention);
    case 'INTERVENTION_DRAG':
      return immutable.wrap(state)
        .set('active', '')
        .set('dragging', action.intervention)
        .value();
  }
  return state;
}
