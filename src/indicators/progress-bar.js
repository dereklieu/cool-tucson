'use strict';
import React from 'react';
import c from 'classnames';
import { pct } from '../util/style-util';

export function ProgressBar(props) {
  const {
    label,
    progress,
    className,
    barClassName,
    winScore
  } = props;

  const hasWinCondition = !isNaN(winScore);

  const containerClass = c(
    className,
    'relative h24 round border scroll-hidden',
    { 'flex-child ml6': !!label }
  );

  const barClass = c(
    barClassName,
    'absolute left h24 round-l transition',
    {
      'round-r': progress === 100,
      'bg-gray-light': !hasWinCondition || progress < winScore,
      'bg-orange-light': hasWinCondition && progress > winScore
    }
  );

  const barStyle = {
    width: pct(progress)
  };

  let winIndicator = null;
  if (hasWinCondition) {
    const winIndicatorStyle = { left: pct(winScore) };
    winIndicator = (
      <div
        className="absolute border border-l top h24"
        style={winIndicatorStyle}
      />
    );
  }

  const progressBar = (
    <div className={containerClass}>
      <div className={barClass} style={barStyle} />
      {winIndicator}
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
