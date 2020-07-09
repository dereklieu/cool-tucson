'use strict';
import c from 'classnames';
import React from 'react';
import { useDrop } from 'react-dnd';
import { px } from '../util/style-util';
import { Intervention } from '../interventions/intervention';
import constants from '../constants';

const getPositionStyle = i => {
  const x = i < 2 ? 'left' : 'right';
  const y = i % 2 === 0 ? 'top' : 'bottom';
  const style = {
    [x]: px(-10),
    [y]: px(-10)
  }
  return style;
};

export function Cell (props) {
  const {
    cell,
    height,
    row,
    column,
    currency,
    applyIntervention
  } = props;
  const { interventions } = cell;
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: constants.NEW_INTERVENTION,
    canDrop: ({ score }) => {
      return interventions.length < 4 && currency >= score.cost;
    },
    drop: ({ name, score }) => {
      return applyIntervention(name, score, row, column);
    },
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
      {interventions.map((intervention, i) => (
        <div
          key={intervention.id}
          className="absolute"
          style={getPositionStyle(i)}
        >
          <Intervention
            id={intervention.id}
            name={intervention.name}
            score={intervention.score}
            dragType={constants.FIELDED_INTERVENTION}
          />
        </div>
      ))}
    </div>
  );
}
