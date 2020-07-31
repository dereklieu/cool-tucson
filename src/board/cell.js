'use strict';
import c from 'classnames';
import React from 'react';
import { useDrop } from 'react-dnd';
import { px } from '../util/style-util';
import { formatCellConstant } from '../util/format';
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
    applyIntervention,
    isActive
  } = props;
  const { interventions } = cell;
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: formatCellConstant(
      constants.NEW_INTERVENTION,
      cell.type
    ),
    canDrop: ({ id, score }) => {
      return id === 'base' ||
        (interventions.length < 4 && currency >= score.cost);
    },
    drop: ({ id, name, score }) => {
      return applyIntervention(id, name, score, row, column);
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver()
    })
  });

  const containerClass = c('w-full relative', {
    'color-orange-light': isOver && canDrop,
    'color-gray': !isOver && canDrop,
    'color-gray-light': !isOver && !canDrop,
  });

  const dimension = height * 0.7;

  let backgroundShape;
  switch (cell.type) {
    case 'Private buildings':
      backgroundShape = (
        <div
          className="absolute top left border"
          style={{
            width: px(dimension),
            height: px(dimension)
          }}
        />
      );
      break;
    case 'Open area':
      backgroundShape = (
        <div
          className="absolute top left border round-full"
          style={{
            width: px(dimension),
            height: px(dimension)
          }}
        />
      );
      break;
    case 'Street':
      backgroundShape = (
        <div
          className="absolute top left border"
          style={{
            marginTop: px(dimension / 4),
            height: px(dimension / 2),
            width: px(dimension)
          }}
        />
      );
      break;
    case 'Town hall':
      backgroundShape = (
        <div
          className="absolute top left"
          style={{
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: `0 ${px(dimension / 2)} ${px(dimension)} ${px(dimension / 2)}`,
            borderColor: 'transparent transparent rgba(100, 100, 100, 0.1) transparent'
          }}
        />
      );
      break;
  }

  return (
    <div
      className={containerClass}
      style={{ height: px(height * .5), borderRadius: '50%' }}
      ref={drop}
    >
      {backgroundShape}
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
