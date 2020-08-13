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
    'flex-child txt-s mr12 mb24'
  );

  const currencyClassName = c(
    pillClass('$'),
    'flex-child txt-s mb24'
  );

  return (
    <div className={c(className, 'w600 hmax360 scroll-auto scroll-styled')}>
      <div className="flex-parent flex-parent--center-cross flex-parent--wrap">
        <h3 className="flex-child txt-h3 txt-bold mr12 mb24">{intervention.name}</h3>
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
