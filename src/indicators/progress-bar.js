'use strict';
import React from 'react';
import c from 'classnames';
import { pct } from '../util/style-util';

export function ProgressBar(props) {
  const {
    label,
    progress,
    className,
    barClassName
  } = props;

  const containerClass = c(
    className,
    'relative h12 round border scroll-hidden',
    { 'flex-child ml6': !!label }
  );

  const barClass = c(
    barClassName,
    'absolute left h12 round-l transition',
    { 'round-r': progress === 100 }
  );

  const barStyle = {
    width: pct(progress)
  };

  const progressBar = (
    <div className={containerClass}>
      <div className={barClass} style={barStyle} />
    </div>
  );

  if (!label) {
    return progressBar;
  }

  return (
    <div className="flex-parent flex-parent--center-cross">
      <h6 className="flex-child txt-bold">{label}</h6>
      {progressBar}
    </div>
  );
}
