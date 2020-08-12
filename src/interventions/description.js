'use strict';
import React from 'react';
import c from 'classnames';
import { connect } from 'react-redux';
import { getIntervention } from './interventions';
import { boardSelectors } from '../store/board-selectors';
import { pillClass } from '../util/style-util';

let Description = (props) => {
  const {
    activeIntervention,
    className
  } = props;

  const intervention = getIntervention(activeIntervention);

  const pillClassName = c(
    pillClass(intervention.type),
    'flex-child txt-s ml12'
  );

  return (
    <div className={c(className, 'w600 hmax360 scroll-auto scroll-styled')}>
      <div className="flex-parent flex-parent--end-cross mb24">
        <h3 className="flex-child txt-h3 txt-bold">{intervention.name}</h3>
        <div className={pillClassName}>{intervention.type}</div>
      </div>
      <div className="prose">
        <p>{intervention.description}</p>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  activeIntervention: boardSelectors.activeIntervention(state)
});

Description = connect(mapStateToProps)(Description);
export { Description };
