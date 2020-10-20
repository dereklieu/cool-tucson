'use strict';
import React from 'react';
import c from 'classnames';
import { connect } from 'react-redux';
import {
  getIntervention,
  getNextIntervention,
  getPrevIntervention
} from './interventions';
import { interventionSelectors } from '../store/intervention-selectors';
import { interventionActionCreators } from '../store/intervention-action-creators';
import { pillClass, bgColor, formatCost, isHDPR } from '../util/style-util';
import { Icon } from './icon';
import { IconLabel } from '../indicators/icon-label';

let Description = (props) => {
  const {
    activeIntervention,
    setIntervention
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

  const containerClass = c(
    'py24 px24 round shadow shadow-darken10',
    'hmax600 scroll-auto scroll-styled',
    bgColor(intervention.type)
  );

  const inputClass = 'py60 px3 bg-lighten50 cursor-pointer color-blue-on-hover opacity75 opacity100-on-hover';

  const iconSize = isHDPR() ? 180 : 240;

  return (
    <div className={containerClass}>
      <div className="pb24 flex-parent flex-parent--center-cross flex-parent--space-between-main">
        <button
          className={inputClass}
          onClick={() => setIntervention(getPrevIntervention(intervention.name).name)}
        >
          <IconLabel
            icon="chevron-left"
            size={24}
          />
        </button>
        <Icon
          className="round-full bg-white"
          name={intervention.name}
          type={intervention.type}
          size={iconSize}
        />
        <button
          className={inputClass}
          onClick={() => setIntervention(getNextIntervention(intervention.name).name)}
        >
          <IconLabel
            icon="chevron-right"
            size={24}
          />
        </button>
      </div>

      <div className="flex-parent flex-parent--center-cross flex-parent--wrap">
        <h4 className="flex-child txt-h4 txt-bold mr6 mb12">{intervention.name}</h4>
        <div className={pillClassName}>{intervention.type}</div>
        <div className={currencyClassName}>{formatCost(intervention.cost)}</div>
      </div>
      <div className="prose">
        <p>{intervention.description}</p>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  activeIntervention: interventionSelectors.active(state)
});

const mapDispatch = {
  setIntervention: interventionActionCreators.setIntervention,
};

Description = connect(mapStateToProps, mapDispatch)(Description);
export { Description };
