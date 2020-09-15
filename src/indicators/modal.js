'use strict';
import React from 'react';
import c from 'classnames';
import { CloseButton } from './close-button';

const underlayStyle = {
  zIndex: 1,
  WebkitOverflowScrolling: 'touch'
};

export function Modal(props) {

  const {
    children,
    onExit
  } = props;

  return (
    <div
      data-id="modal-underlay"
      className="fixed top right bottom left px12 py12 bg-darken25 px60-mm py60-mm scroll-hidden cursor-pointer align-center"
      style={underlayStyle}
      onClick={onExit}
    >
      <div className="relative w600 wmax-full bg-white inline-block round cursor-default align-l">
        {children}
        <CloseButton onClick={onExit} />
      </div>
    </div>
  );

}
