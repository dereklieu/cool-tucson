'use strict';
import React from 'react';
import { useDrag } from 'react-dnd';
import c from 'classnames';
import ReactTooltip from 'react-tooltip';

import { Icon } from './icon';
import constants from '../constants';
import { px } from '../util/style-util';
import { formatCellConstant } from '../util/format';

const collect = (monitor) => {
  return {
    isDragging: monitor.isDragging()
  };
}

export const Intervention = (props) => {
  const {
    id,
    name,
    interventionType,
    isActive,
    changeActiveIntervention,
    score,
    dragType
  } = props;

  // Fielded interventions have different behavior than
  // non-fielded.
  //
  // 1. They can be dragged without an active state.
  // 2. Drag destinations are not discriminatory
  // (as board cells are).
  const isFielded = dragType === constants.FIELDED_INTERVENTION;

  const type = isFielded ? dragType : formatCellConstant(dragType, interventionType);

  const [{ isDragging }, drag] = useDrag({
    item: { id, name, score, type },
    begin: () => {
      ReactTooltip.hide();
      changeActiveIntervention('', '');
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

  const setActive = () => changeActiveIntervention(name, interventionType);

  return (
    <div
      className="mx3 my3 bg-transparent"
      data-tip={isFielded ? undefined : `${constants.NEW_INTERVENTION}_${name}`}
    >
      <div
        ref={drag}
        style={interventionStyle}
        className={interventionClass}
        onClick={setActive}
      >
        <Icon size={size} name={name} type={interventionType} />
      </div>
    </div>
  );
};
