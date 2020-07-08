'use strict';

const actions = {};

actions.dropIntervention = (name, score, row, column) => ({
  type: 'DROP_INTERVENTION',
  name,
  score,
  row,
  column
});

export const boardActionCreators = actions;
