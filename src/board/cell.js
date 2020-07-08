'use strict';
import c from 'classnames';
import React from 'react';
import { useDrop } from 'react-dnd';
import { px } from '../util/style-util';
import { Intervention } from '../interventions/intervention';
import constants from '../constants';

export function Cell (props) {
  const {
    cell,
    height,
    row,
    column,
    dropIntervention
  } = props;
  const { interventions } = cell;
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: constants.NEW_INTERVENTION,
    canDrop: () => interventions.length < 4,
    drop: ({ name, score }) => dropIntervention(name, score, row, column),
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver()
    })
  });

  const containerClass = c('w-full relative', {
    'border border--gray': canDrop && isOver,
    'border border--gray-light': canDrop && !isOver
  });

  return (
    <div
      className={containerClass}
      style={{ height: px(height * .5), borderRadius: '50%' }}
      ref={drop}
    >
      {interventions.map(intervention => (
        <div
          key={intervention.id}
          className={`absolute ${intervention.x} ${intervention.y}`}
        >
          <Intervention
            name={intervention.name}
            score={intervention.score}
            dragType={constants.FIELDED_INTERVENTION}
          />
        </div>
      ))}
    </div>
  );
}
