'use strict';

import { createSelector } from 'reselect';

const root = state => state.intervention;

const interventionSelectors = {};

interventionSelectors.active = createSelector(
  root,
  intervention => intervention.active
);

interventionSelectors.dragging = createSelector(
  root,
  intervention => intervention.dragged
);

export { interventionSelectors };
