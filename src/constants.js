'use strict';

import { interventions } from './board/interventions-svg';
import { isHDPR } from './util/style-util';

// Construct a map of interventions that require other interventions
const prereqs = {};
for (const type in interventions) {
  for (const intervention in interventions[type]) {
    if (interventions[type][intervention].requires) {
      prereqs[intervention] = interventions[type][intervention].requires;
    }
  }
}

const constants = {
  NEW_INTERVENTION: 'NEW_INTERVENTION',
  FIELDED_INTERVENTION: 'FIELDED_INTERVENTION',
  LOCALE_CHANGE: 'LOCALE_CHANGE',
  ERASER: 'ERASER',
  BADGE: 'BADGE',
  COPY: 'COPY',
  SCORE_SOCIAL: 'SCORE_SOCIAL',
  SCORE_ENVIRO: 'SCORE_ENVIRO',
  SCORE_CURRENCY: 'SCORE_CURRENCY',

  BOARD_NATIVE_WIDTH: 2000,
  BOARD_NATIVE_HEIGHT: 740,
  HEIGHT_RATIO: 740 / 2000,

  LOCALES: {
    hh: 'El Houslanta',
    hd: 'Las Albusconix',
    t: 'San Porteattlopolis'
  },

  INTERVENTION_SIZE: isHDPR() ? 48: 80,

  INITIAL_CURRENCY: 500,
  WIN_SCORE: 15,

  INTERVENTION_PREREQUISITES: prereqs
};

export default constants;
