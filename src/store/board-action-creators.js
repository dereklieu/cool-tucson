'use strict';

const actions = {};

actions.applyIntervention = (name, score, row, column) => ({
  type: 'APPLY_INTERVENTION',
  name,
  score,
  row,
  column
});

actions.removeIntervention = (id, score) => ({
  type: 'REMOVE_INTERVENTION',
  id,
  score
});

actions.changeInterventionType = (interventionType) => ({
  type: 'CHANGE_INTERVENTION_TYPE',
  interventionType
});

export const boardActionCreators = actions;
