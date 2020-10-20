'use strict';
import React from 'react';
import c from 'classnames';
import { CloseButton } from './close-button';
import { vh } from '../util/style-util';

const underlayStyle = {
  zIndex: 100,
  WebkitOverflowScrolling: 'touch'
};

const modalStyle = {
  maxHeight: vh(80)
};

export function Modal(props) {
  const {
    children,
    onExit
  } = props;

  const trap = e => e.stopPropagation();

  return (
    <div
      data-id="modal-underlay"
      className="fixed top right bottom left px12 py12 bg-darken25 px30-mm py30-mm scroll-hidden cursor-pointer align-center"
      style={underlayStyle}
      onClick={onExit}
    >
      <div className="relative w600 wmax-full bg-white inline-block round cursor-default align-l scroll-auto" onClick={trap} style={modalStyle}>
        {children}
        <CloseButton onClick={onExit} />
      </div>
    </div>
  );
}
