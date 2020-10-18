'use strict';
import React from 'react';
import { IconLabel } from './icon-label';

export const CloseButton = (props) => {
  return (
    <div className="absolute top right">
      <button className="btn btn--transparent unround-t unround-br color-gray py12 px12" onClick={props.onClick}>
        <IconLabel size={18} icon="close" />
      </button>
    </div>
  );
};
