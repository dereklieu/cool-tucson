'use strict';

const actions = {};

actions.setIntervention = (intervention) => ({
  type: 'INTERVENTION_SET',
  intervention: intervention || ''
});

actions.dragIntervention = (intervention) => ({
  type: 'INTERVENTION_DRAG',
  intervention: intervention || ''
});

export const interventionActionCreators = actions;
