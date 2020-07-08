'use strict';

import { createSelector } from 'reselect';

const root = state => state.setting;

const settingSelectors = {};

settingSelectors.locale = createSelector(
  root,
  setting => setting.locale
);

export { settingSelectors };
