'use strict';

import { createSelector } from 'reselect';

const root = state => state.score;

const scoreSelectors = {};

scoreSelectors.currency = createSelector(
  root,
  score => score.currency
);

export { scoreSelectors };
