'use strict';
import constants from '../constants';

const actions = {};

actions.applyIntervention = (plot, intervention) => {
  if (intervention === constants.ERASER) {
    return {
      type: 'REMOVE_INTERVENTIONS',
      plot
    };
  } else {
    return {
      type: 'APPLY_INTERVENTION',
      plot,
      intervention
    };
  }
};

actions.changeLocale = (locale) => ({
  type: 'CHANGE_LOCALE',
  locale
});


export const boardActionCreators = actions;
