'use strict';

const actions = {};

actions.dropIntervention = (row, column, icon) => ({
  type: 'DROP_INTERVENTION',
  row,
  column,
  icon
});

export const boardActionCreators = actions;
