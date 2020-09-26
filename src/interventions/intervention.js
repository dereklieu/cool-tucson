'use strict';
import React from 'react';
import { useDrag } from 'react-dnd';
import c from 'classnames';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';

import { scoreSelectors } from '../store/score-selectors';
import { interventionActionCreators } from '../store/intervention-action-creators';

import { Icon } from './icon';

import constants from '../constants';
import { getIntervention } from './interventions';
import { px } from '../util/style-util';

const collect = (monitor) => {
  return {
    canDrag: monitor.canDrag(),
    isDragging: monitor.isDragging()
  };
}

let Intervention = (props) => {
  const {
    currency,
    setIntervention,
    dragIntervention,

    name,
    type,
    isActive,
    cost
  } = props;

  const [{ canDrag, isDragging }, drag] = useDrag({
    item: {
      type: constants.NEW_INTERVENTION,
      name
    },
    canDrag: () => currency >= cost,
    begin: () => {
      ReactTooltip.hide();
      dragIntervention(name);
    },
    end: () => {
      dragIntervention(null);
    },
    collect
  });

  const size = 80;

  let cursor;
  if (isDragging) cursor = 'grabbing';
  else if (!canDrag) cursor = 'not-allowed';
  else cursor = 'grab';

  const interventionStyle = {
    width: px(size),
    height: px(size),
    cursor
  };

  if (!canDrag) {
    interventionStyle.filter = 'grayscale(100%)';
  }

  const interventionClass = c({
    'opacity50': !canDrag,
    'bg-white round shadow shadow-darken10': isActive
  });

  return (
    <div
      className="mx3 my3 bg-transparent"
      data-tip={`${constants.NEW_INTERVENTION}_${name}`}
    >
      <div
        ref={drag}
        style={interventionStyle}
        className={interventionClass}
        onClick={() => setIntervention(name)}
      >
        <Icon size={size} name={name} type={type} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currency: scoreSelectors.currency(state)
});

const mapDispatch = {
  setIntervention: interventionActionCreators.setIntervention,
  dragIntervention: interventionActionCreators.dragIntervention
};

Intervention = connect(
  mapStateToProps,
  mapDispatch
)(Intervention);

export { Intervention };
