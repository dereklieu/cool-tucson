'use strict';
import { wrap, update, get, set } from 'object-path-immutable';
import { positions } from '../board/positions-svg';
import { getIntervention } from '../interventions/interventions';
import constants from '../constants';

const interventions = {};
positions.forEach(plot => {
  interventions[plot.id] = [];
});

export const initialState = {
  locale: null,
  interventions,
  score: {
    currency: constants.INITIAL_CURRENCY,
    environmental: 0,
    social: 0
  },
  outcomes: []
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_LOCALE':
      return wrap(initialState)
      .set('locale', action.locale)
      .value();

    case 'APPLY_INTERVENTION': {
      const { plot, intervention } = action;
      const position = positions.find(p => p.id === plot);
      const meta = position.interventions[intervention];
      const removes = meta.removes
        && state.interventions[plot].includes(meta.removes)
        && getInterventionScore(meta.removes, state.locale);

      return wrap(state)
      .update('score', removeInterventionScore(removes))
      .update('score', applyInterventionScore(getInterventionScore(intervention, state.locale)))
      .update(['interventions', plot], removeIntervention(meta.removes))
      .update(['interventions', plot], pushIntervention(intervention))
      .update(['interventions', plot], sort(plot))
      .update('outcomes', applyOutcomes(intervention))
      .value();
    }

    case 'REMOVE_INTERVENTIONS': {
      const removes = state.interventions[action.plot]
      .map(i => getInterventionScore(i, state.locale));
      removes.forEach(score => {
        state = update(
          state,
          'score',
          removeInterventionScore(score)
        );
      });
      state = set(
        state,
        ['interventions', action.plot],
        []
      );
      state = set(state, 'outcomes', getRemainingOutcomes(state.interventions));
      return state;
    }

    case 'SYNC_INITIAL_STATE': {
      return action.state
    }
  }
  return state;
}

const noop = x => x;

function getInterventionScore(intervention, locale) {
  return getIntervention(intervention).score[locale];
}

function removeInterventionScore(score) {
  if (!score) return noop;
  const { environmental, social, cost } = score;
  return state => ({
    currency: state.currency + cost,
    environmental: state.environmental - environmental,
    social: state.social - social
  });
}

function applyInterventionScore(score) {
  if (!score) return noop;
  const { environmental, social, cost } = score;
  return score => ({
    currency: score.currency - cost,
    environmental: score.environmental + environmental,
    social: score.social + social
  });
}

function removeIntervention(intervention) {
  if (!intervention) return noop;
  return interventions => interventions.filter(i => i !== intervention);
}

function pushIntervention(intervention) {
  if (!intervention) return noop;
  return interventions => interventions.concat(intervention);
}

function sort(plot) {
  const { interventions: order } = positions.find(p => p.id === plot);
  const getOrder = i => get(order, [i, 'placement', 'z'], 1);
  return interventions => {
    let next = interventions;
    next.sort((a, b) => getOrder(a) - getOrder(b));
    return next;
  };
}

function applyOutcomes(intervention) {
  const { outcomes } = getIntervention(intervention);
  return state => {
    return state.concat(
      outcomes.filter(outcome => state.indexOf(outcome) === -1)
    );
  };
}

function getRemainingOutcomes(interventions) {
  const remaining = new Set();
  for (let id in interventions) {
    interventions[id].forEach(i => {
      const { outcomes } = getIntervention(i);
      outcomes.forEach(outcome => {
        remaining.add(outcome);
      });
    });
  }
  return [...remaining];
}
