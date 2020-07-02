'use strict';

import { createSelector } from 'reselect';

const root = state => state.board;

const boardSelectors = {};

boardSelectors.cells = createSelector(
  root,
  board => board.cells
);

export { boardSelectors };
