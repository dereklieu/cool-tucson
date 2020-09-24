'use strict';

const actions = {};

actions.applyIntervention = (plot, intervention) => ({
  type: 'APPLY_INTERVENTION',
  plot,
  intervention
});

export const boardActionCreators = actions;
