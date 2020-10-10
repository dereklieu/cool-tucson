'use strict';

import { createSelector } from 'reselect';

const root = state => state.board;

const boardSelectors = {};

boardSelectors.hasInterventions = createSelector(
  root,
  board => {
    for (const plot in board.interventions) {
      if (board.interventions[plot].length) return true;
    }
    return false;
  }
);

boardSelectors.interventions = createSelector(
  [
    root,
    (_, props) => props.plot
  ],
  (board, plot) => board.interventions[plot]
);

boardSelectors.outcomes = createSelector(
  root,
  board => board.outcomes
);

boardSelectors.locale = createSelector(
  root,
  board => board.locale
);

export { boardSelectors };
