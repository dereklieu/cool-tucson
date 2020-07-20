'use strict';
import * as immutable from 'object-path-immutable';
import hat from 'hat';
import {
  interventions as data,
  interventionTypes
} from '../interventions/interventions';

const cell = () => ({
  interventions: []
});

const getInterventionForType = (type) => data.find(i => i.type === type);

const initialState = {
  interventionType: interventionTypes[0],
  activeIntervention: getInterventionForType(interventionTypes[0]).name,
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

const removeIntervention = id => cells => {
  for (let row = 0; row < cells.length; row += 1) {
    for (let column = 0; column < cells[row].length; column += 1) {
      const { interventions } = cells[row][column];
      if (interventions.find(i => i.id === id)) {
        return immutable.update(
          cells,
          [row, column, 'interventions'],
          interventions => interventions.filter(i => i.id !== id)
        );
      }
    }
  }
  return cells;
};

export function reducer(state = initialState, action) {
  switch(action.type) {
    case 'APPLY_INTERVENTION':
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

    case 'REMOVE_INTERVENTION':
      return immutable.update(
        state,
        'cells',
        removeIntervention(action.id)
      );

    case 'CHANGE_INTERVENTION_TYPE':
      state = immutable.set(
        state,
        'interventionType',
        action.interventionType
      );
      return immutable.set(
        state,
        'activeIntervention',
        getInterventionForType(action.interventionType).name
      );
  }
  return state;
}
