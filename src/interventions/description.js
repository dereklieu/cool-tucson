'use strict';
import React from 'react';
import { interventions } from './interventions';

export const Description = (props) => {
  const {
    activeIntervention
  } = props;

  const intervention = interventions.find(
    i => i.name === activeIntervention
  );

  return (
    <div className="prose wmax600">
      <h3 className="txt-h3">{intervention.name}</h3>
      <p>{intervention.description}</p>
    </div>
  );
};
