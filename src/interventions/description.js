'use strict';
import React from 'react';
import c from 'classnames';
import { connect } from 'react-redux';
import { getIntervention } from './interventions';
import { boardSelectors } from '../store/board-selectors';

let Description = (props) => {
  const {
    activeIntervention,
    className
  } = props;

  const intervention = getIntervention(activeIntervention);

  return (
    <div className={c(className, 'w600 hmax360 scroll-auto scroll-styled')}>
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

const mapStateToProps = state => ({
  activeIntervention: boardSelectors.activeIntervention(state)
});

Description = connect(mapStateToProps)(Description);
export { Description };
