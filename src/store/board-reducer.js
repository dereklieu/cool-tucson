'use strict';
import * as immutable from 'object-path-immutable';
import hat from 'hat';
import {
  interventions as data,
  interventionTypes
} from '../interventions/interventions';
import { badges } from '../badges/badges';

const initialState = {
  interventionType: '',
  activeIntervention: '',
  cells: [
    [...Array(6)].map(makeCell),
    [...Array(6)].map(makeCell)
  ],
  score: {
    currency: 500000,
    environmental: 0,
    social: 0
  },
  badges: []
};

export function reducer(state = initialState, action) {
  switch(action.type) {
    case 'APPLY_INTERVENTION':
      state = immutable.update(state, 'score', applyInterventionScore(action.score));
      state = immutable.update(state, 'badges', syncBadges(state.score));
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
      state = immutable.update(state, 'score', removeInterventionScore(action.score));
      state = immutable.update(state, 'badges', syncBadges(state.score));
      state = immutable.update(state, 'cells', removeIntervention(action.id));
      return state;

    case 'CLEAR_INTERVENTIONS': {
      const path = [
        'cells',
        action.row,
        action.column,
        'interventions'
      ];
      immutable.get(state, path, []).forEach(i => {
        state = immutable.update(state, 'score', removeInterventionScore(i.score));
      });
      state = immutable.update(state, 'badges', syncBadges(state.score));
      return immutable.set(
        state,
        path,
        []
      );
    }

    case 'CHANGE_ACTIVE_INTERVENTION':
      state = immutable.set(state, 'interventionType', action.interventionType);
      state = immutable.set(state, 'activeIntervention', action.intervention);
      return state;

    case 'CHANGE_INTERVENTION_TYPE':
      state = immutable.set(state, 'interventionType', action.interventionType);
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

function syncBadges(score) {
  const passed = badges.filter(b => {
    const { type, threshold } = b.requirement;
    return score[type] >= threshold;
  });

  return state => {
    const earned = new Set(state.map(b => b.title));
    const newBadges = passed.filter(b => !earned.has(b.title)).map(b => ({
      ...b,
      isPassed: true
    }));
    return state.concat(newBadges).map(b => {
      const { title } = b;
      const isPassed = Boolean(passed.find(b => b.title === title));
      return {
        ...b,
        isPassed
      };
    });
  };
}
