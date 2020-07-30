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
    <div className="wmax600 hmax360 scroll-auto scroll-styled">
      <div className="flex-parent flex-parent--end-cross mb24">
        <h3 className="flex-child txt-h3 txt-bold">{intervention.name}</h3>
        <div className="flex-child txt-s round border px6 py3 ml12">{intervention.type}</div>
      </div>
      <div className="prose">
        <p>{intervention.description}</p>
      </div>
    </div>
  );
};
