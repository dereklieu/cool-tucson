'use strict';

import { createSelector } from 'reselect';
import { getIntervention } from '../interventions/interventions';
import constants from '../constants';

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
  intervention => intervention && intervention !== constants.ERASER
    ? getIntervention(intervention).type
    : ''
);

export { interventionSelectors };
