'use strict';

const actions = {};

actions.applyIntervention = (plot, intervention, score) => ({
  type: 'APPLY_INTERVENTION',
  plot,
  intervention,
  score
});

export const boardActionCreators = actions;
