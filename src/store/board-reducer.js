'use strict';
import * as immutable from 'object-path-immutable';

const cell = () => ({
  interventions: []
});

const initialState = {
  cells: [
    [...Array(4).map(cell)],
    [...Array(4).map(cell)]
  ]
};

export function reducer(state = initialState, action) {
  switch(action.type) {
    case 'DROP_INTERVENTION':
      return immutable.push(
        state,
        [
          action.row,
          action.column,
          'interventions'
        ],
        action.intervention
      );
  }
  return state;
}
