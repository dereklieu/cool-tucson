'use strict';
import * as immutable from 'object-path-immutable';
import hat from 'hat';
import {
  interventions as data,
  interventionTypes
} from '../interventions/interventions';

const initialIntervention = data[0];
const initialState = {
  interventionType: initialIntervention.type,
  activeIntervention: initialIntervention.name,
  cells: [
    [...Array(6)].map(makeCell),
    [...Array(6)].map(makeCell)
  ],
  score: {
    currency: 100,
    environmental: 0,
    social: 0
  }
};

export function reducer(state = initialState, action) {
  switch(action.type) {
    case 'APPLY_INTERVENTION':
      state = immutable.update(
        state,
        'score',
        applyInterventionScore(action.score)
      );
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

    case 'CLEAR_INTERVENTIONS': {
      return immutable.set(
        state,
        [
          'cells',
          action.row,
          action.column,
          'interventions'
        ],
        []
      );
    }

    case 'REMOVE_INTERVENTION':
      state = immutable.update(
        state,
        'score',
        removeInterventionScore(action.score)
      );
      return immutable.update(
        state,
        'cells',
        removeIntervention(action.id)
      );

    case 'CHANGE_ACTIVE_INTERVENTION':
      state = immutable.set(
        state,
        'interventionType',
        action.interventionType
      );
      return immutable.set(
        state,
        'activeIntervention',
        action.intervention
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
        data.find(i => i.type === action.interventionType).name
      );
  }
  return state;
}

function getRandomInterventionType() {
  const count = interventionTypes.length;
  return interventionTypes[Math.floor(Math.random() * count)];
}

function makeCell() {
  return {
    interventions: [],
    type: getRandomInterventionType()
  };
}

function pushIntervention(name, score) {
  return interventions => interventions.concat({
    name,
    score,
    id: hat()
  });
}

function removeIntervention(id) {
  return cells => {
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
}

function applyInterventionScore(score) {
  const { environmental, social, cost } = score;
  return state => ({
    currency: state.currency - cost,
    environmental: state.environmental + environmental,
    social: state.social + social
  });
}

function removeInterventionScore(score) {
  const { environmental, social, cost } = score;
  return state => ({
    currency: state.currency + cost,
    environmental: state.environmental - environmental,
    social: state.social - social
  });
}
