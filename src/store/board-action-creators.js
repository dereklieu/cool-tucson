'use strict';

export const dropIntervention = (row, column, intervention) => ({
  type: 'DROP_INTERVENTION',
  row,
  column,
  intervention
});
