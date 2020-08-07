'use strict';

import { createSelector } from 'reselect';

const root = state => state.board;

const boardSelectors = {};

boardSelectors.cells = createSelector(
  root,
  board => board.cells
);

boardSelectors.interventionType = createSelector(
  root,
  board => board.interventionType
);

boardSelectors.activeIntervention = createSelector(
  root,
  board => board.activeIntervention
);

boardSelectors.badges = createSelector(
  root,
  board => board.badges
);

export { boardSelectors };
