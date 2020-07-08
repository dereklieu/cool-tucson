'use strict';
import React from 'react';
import c from 'classnames';
import { pct } from '../util/style-util';

export function ProgressBar(props) {
  const {
    progress,
    className,
    barClassName
  } = props;
  const containerClass = c('relative w-full h12 round border scroll-hidden', className);
  const barClass = c(
    'absolute left h12 round-l transition',
    {
      'round-r': progress === 100
    },
    barClassName
  );
  const barStyle = {
    width: pct(progress)
  };

  return (
    <div className={containerClass}>
      <div className={barClass} style={barStyle} />
    </div>
  );
}
