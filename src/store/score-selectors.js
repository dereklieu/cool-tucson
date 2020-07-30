'use strict';

import { createSelector } from 'reselect';

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

scoreSelectors.winThreshold = () => 20;
scoreSelectors.winScore = () => 100 / 1.4;

const normalizeScore = (threshold, score) => {
  // Scale the score to fit between a range of 1-100.
  // 100 represents the win threshold * 1.4.
  const max = threshold * 1.4;
  return Math.floor(score / max * 100);
};

scoreSelectors.socialScore = createSelector(
  [
    scoreSelectors.winThreshold,
    scoreSelectors.social
  ],
  normalizeScore
);

scoreSelectors.environmentalScore = createSelector(
  [
    scoreSelectors.winThreshold,
    scoreSelectors.environmental
  ],
  normalizeScore
);

export { scoreSelectors };
