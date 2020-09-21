'use strict';

const actions = {};

actions.changeActiveIntervention = (intervention) => ({
  type: 'CHANGE_ACTIVE_INTERVENTION',
  intervention: intervention || ''
});

export const boardActionCreators = actions;
