'use strict';

import { createSelector } from 'reselect';
import constants from '../constants';

const root = state => state.board.score;

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

scoreSelectors.hasWon = createSelector(
  scoreSelectors.social,
  social => social >= constants.SOCIAL_WIN_SCORE
);

export { scoreSelectors };
