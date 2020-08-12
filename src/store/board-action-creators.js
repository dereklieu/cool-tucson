'use strict';

import constants from '../constants';

const actions = {};

actions.applyIntervention = (id, name, score, row, column) => {
  if (id === constants.ERASER) {
    return {
      type: 'CLEAR_INTERVENTIONS',
      row,
      column
    };
  } else {
    return {
      type: 'APPLY_INTERVENTION',
      name,
      score,
      row,
      column
    };
  }
}

actions.removeIntervention = (id, score) => ({
  type: 'REMOVE_INTERVENTION',
  id,
  score
});

actions.changeInterventionType = (interventionType) => ({
  type: 'CHANGE_INTERVENTION_TYPE',
  interventionType
});

actions.changeActiveIntervention = (intervention, interventionType) => ({
  type: 'CHANGE_ACTIVE_INTERVENTION',
  intervention,
  interventionType
});

export const boardActionCreators = actions;
