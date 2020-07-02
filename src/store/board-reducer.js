'use strict';
import * as immutable from 'object-path-immutable';
import hat from 'hat';

const cell = () => ({
  interventions: []
});

const initialState = {
  cells: [
    [...Array(4)].map(cell),
    [...Array(4)].map(cell)
  ]
};

const pushIntervention = icon => interventions => {
  const idx = interventions.length;
  const x = idx < 2 ? 'left ' : 'right';
  const y = idx % 2 === 0 ? 'top' : 'bottom';
  return interventions.concat({
    x,
    y,
    icon,
    id: hat()
  });
};

export function reducer(state = initialState, action) {
  switch(action.type) {
    case 'DROP_INTERVENTION':
      return immutable.update(
        state,
        [
          'cells',
          action.row,
          action.column,
          'interventions'
        ],
        pushIntervention(action.icon)
      );
  }
  return state;
}
