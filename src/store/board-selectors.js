'use strict';

import { createSelector } from 'reselect';

const root = state => state.board;

const boardSelectors = {};

boardSelectors.interventions = createSelector(
  [
    root,
    (_, props) => props.plot
  ],
  (board, plot) => board.interventions[plot]
);

boardSelectors.badges = createSelector(
  root,
  board => board.badges
);

boardSelectors.locale = createSelector(
  root,
  board => board.locale
);

export { boardSelectors };
