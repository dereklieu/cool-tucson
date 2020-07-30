'use strict';

const actions = {};

actions.changeLocale = (locale) => ({
  type: 'CHANGE_LOCALE',
  locale
});

export const settingActionCreators = actions;
