'use strict';

const initialState = {
  currency: 100,
  environmental: 0,
  social: 0
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'DROP_INTERVENTION': {
      const { environmental, social, cost } = action.score;
      return {
        currency: state.currency - cost,
        environmental: state.environmental + environmental,
        social: state.social + social
      }
    }
  }
  return state;
}
