'use strict';
import * as immutable from 'object-path-immutable';
import { badges } from '../badges/badges';

const initialState = {
  score: {
    currency: 500000,
    environmental: 0,
    social: 0
  },
  badges: []
};

export function reducer(state = initialState, action) {
  return state;
}

  /*
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
*/
