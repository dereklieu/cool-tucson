'use strict';
import { wrap, update, get, set } from 'object-path-immutable';
import { badges } from '../badges/badges';
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
  badges: []
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

  /*

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
