'use strict';

import { createSelector } from 'reselect';
import { getIntervention } from '../interventions/interventions';

const root = state => state.intervention;

const interventionSelectors = {};

interventionSelectors.active = createSelector(
  root,
  intervention => intervention.active
);

interventionSelectors.dragging = createSelector(
  root,
  intervention => intervention.dragging
);

interventionSelectors.draggedType = createSelector(
  interventionSelectors.dragging,
  intervention => intervention ? getIntervention(intervention).type : ''
);

export { interventionSelectors };
