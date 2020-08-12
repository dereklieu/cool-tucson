'use strict';
import React from 'react';
import { useDrag } from 'react-dnd';
import c from 'classnames';
import constants from '../constants';
import { px } from '../util/style-util';
import { formatCellConstant } from '../util/format';

const collect = (monitor) => {
  return {
    isDragging: monitor.isDragging()
  };
}

const parseName = name =>
  name.split(' ')
    .map(word =>
      word === 'and' ? '&' : word.charAt(0).toUpperCase()
    )
    .join('');

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

  const isDraggable = isFielded || isActive;
  const type = isFielded
    ? dragType
    : formatCellConstant(dragType, interventionType);

  const [{ isDragging }, drag] = useDrag({
    item: { id, name, score, type },
    canDrag: () => isDraggable,
    collect
  });

  // Hide placed interventions when they are being dragged
  if (isDragging && isFielded) {
    return null;
  }

  let cursor;
  if (isDraggable) {
    cursor = isDragging ? 'grabbing' : 'grab';
  } else {
    cursor = 'pointer';
  }

  const size = 60;
  const dimension = isFielded ? 'auto' : px(size);
  const height = !isFielded && interventionType === 'Street' ? px(size / 2) : dimension;
  const containerStyle = {
    cursor,
    height,
    lineHeight: height,
    width: dimension,
    verticalAlign: 'middle'
  };

  let backgroundShape;
  if (!isFielded) {
    switch (interventionType) {
      case 'Private buildings':
        backgroundShape = (
          <div
            className="absolute top left border"
            style={{
              width: dimension,
              height: dimension
            }}
          />
        );
        break;
      case 'Open area':
        backgroundShape = (
          <div
            className="absolute top left border round-full"
            style={{
              width: dimension,
              height: dimension
            }}
          />
        );
        break;
      case 'Street':
        backgroundShape = (
          <div
            className="absolute top left border"
            style={{
              width: dimension,
              height: px(size / 2)
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
              borderWidth: `0 ${px(size / 2)} ${px(size)} ${px(size / 2)}`,
              borderColor: 'transparent transparent rgba(100, 100, 100, 0.1) transparent'
            }}
          />
        );
        break;
    }
  }

  const containerClass = c(
    'align-center relative',
    {
      'ml6 mb6': !isFielded,
      'color-gray-light': !isDraggable
    }
  );

  const displayName = parseName(name);
  const setActive = () => {
    if (changeActiveIntervention) {
      changeActiveIntervention(name, interventionType);
    }
  };

  return (
    <div
      ref={drag}
      className={containerClass}
      style={containerStyle}
      onClick={setActive}
      data-tip={isFielded ? undefined : `${constants.NEW_INTERVENTION}_${name}`}
    >
      {backgroundShape}
      <strong>{displayName}</strong>
    </div>
  );
};
