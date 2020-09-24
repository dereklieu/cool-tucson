'use strict';

const actions = {};

actions.applyIntervention = (plot, intervention) => ({
  type: 'APPLY_INTERVENTION',
  plot,
  intervention
});

actions.changeLocale = (locale) => ({
  type: 'CHANGE_LOCALE',
  locale
});


export const boardActionCreators = actions;
