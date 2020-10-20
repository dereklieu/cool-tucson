'use strict';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { usePreview } from 'react-dnd-preview';

import constants from '../constants';
import { Icon } from '../interventions/icon';

function isTouchDevice() {
  if ('ontouchstart' in window || window.TouchEvent) return true;
  if (window.DocumentTouch && document instanceof DocumentTouch) return true;
  const prefixes = ['', '-webkit-', '-moz-', '-o-', '-ms-'];
  const queries = prefixes.map(prefix => `(${prefix}touch-enabled)`);
  return window.matchMedia(queries.join(',')).matches;
}

const isTouch = isTouchDevice();

const DndPreview = () => {
  const {display, item, style} = usePreview();
  if (!display) {
    return null;
  }
  const { name, interventionType } = item;
  return (
    <div style={{...style, zIndex: 30 }}>
      <Icon size={constants.INTERVENTION_SIZE} name={name} type={interventionType} />
    </div>
  )
};

export const ProvideDndProvider = (props) => {
  if (isTouch) {
    return (
      <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        {props.children}
        <DndPreview />
      </DndProvider>
    );
  } else {
    return (
      <DndProvider backend={HTML5Backend}>
        {props.children}
      </DndProvider>
    );
  }
}
