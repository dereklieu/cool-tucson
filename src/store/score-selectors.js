'use strict';

import { createSelector } from 'reselect';

const root = state => state.score;

const scoreSelectors = {};

scoreSelectors.currency = createSelector(
  root,
  score => score.currency
);

scoreSelectors.social = createSelector(
  root,
  score => score.social
);

scoreSelectors.environmental = createSelector(
  root,
  score => score.environmental
);

export { scoreSelectors };
