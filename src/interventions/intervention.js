'use strict';
import React from 'react';
import { useDrag } from 'react-dnd';
import c from 'classnames';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';

import { interventionActionCreators } from '../store/intervention-action-creators';

import { Icon } from './icon';

import constants from '../constants';
import { px } from '../util/style-util';

const collect = (monitor) => {
  return {
    isDragging: monitor.isDragging()
  };
}

let Intervention = (props) => {
  const {
    setIntervention,
    dragIntervention,

    id,
    name,
    type,
    isActive,
    score,
  } = props;

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: constants.NEW_INTERVENTION,
      id,
      name,
      score,
    },
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
  const cursor = isDragging ? 'grabbing' : 'grab';
  const interventionStyle = {
    width: px(size),
    height: px(size),
    cursor
  };

  const interventionClass = c({
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

const mapDispatch = {
  setIntervention: interventionActionCreators.setIntervention,
  dragIntervention: interventionActionCreators.dragIntervention
};

Intervention = connect(
  null,
  mapDispatch
)(Intervention);

export { Intervention };
