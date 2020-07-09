'use strict';
import * as immutable from 'object-path-immutable';
import hat from 'hat';

const cell = () => ({
  interventions: []
});

const initialState = {
  cells: [
    [...Array(6)].map(cell),
    [...Array(6)].map(cell)
  ]
};

const pushIntervention = (name, score) => interventions => {
  return interventions.concat({
    name,
    score,
    id: hat()
  });
};

export function reducer(state = initialState, action) {
  switch(action.type) {
    case 'DROP_INTERVENTION':
      return immutable.update(
        state,
        [
          'cells',
          action.row,
          action.column,
          'interventions'
        ],
        pushIntervention(action.name, action.score)
      );
  }
  return state;
}
