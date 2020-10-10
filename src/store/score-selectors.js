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
  [
    scoreSelectors.social,
    scoreSelectors.environmental
  ],
  (social, environmental) => (social + environmental) >= constants.WIN_SCORE
);

export { scoreSelectors };
