'use strict';
import React from 'react';
import c from 'classnames';
import { connect } from 'react-redux';
import { getIntervention } from './interventions';
import { boardSelectors } from '../store/board-selectors';
import { pillClass } from '../util/style-util';
import { Modal } from '../indicators/modal';

let Description = (props) => {
  const {
    activeIntervention,
    className
  } = props;

  if (!activeIntervention) return null;

  const intervention = getIntervention(activeIntervention);

  const pillClassName = c(
    pillClass(intervention.type),
    'flex-child txt-s mr6 mb12'
  );

  const currencyClassName = c(
    pillClass('$'),
    'flex-child txt-s mb12'
  );

  return (
    <div className={c(className, 'w600 hmax360 scroll-auto scroll-styled')}>
      <div className="flex-parent flex-parent--center-cross flex-parent--wrap">
        <h4 className="flex-child txt-h4 txt-bold mr6 mb12">{intervention.name}</h4>
        <div className={pillClassName}>{intervention.type}</div>
        <div className={currencyClassName}>$$</div>
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
