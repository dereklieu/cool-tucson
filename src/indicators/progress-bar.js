'use strict';
import React from 'react';
import c from 'classnames';
import { pct } from '../util/style-util';

export function ProgressBar(props) {
  const {
    label,
    score,
    threshold,
    max,
    className,
    barClassName,
    width,
    height
  } = props;

  const hasWinCondition = !isNaN(threshold);
  const progress = score / max * 100;

  const hClass = height || 'h24';
  const wClass = width || 'w300';

  const containerClass = c(
    className,
    hClass,
    wClass,
    'relative round border scroll-hidden'
  );

  const barClass = c(
    barClassName,
    hClass,
    'absolute left round-l transition',
    {
      'round-r': progress === 100,
      'bg-gray-light': !hasWinCondition || progress < threshold,
      'bg-orange-light': hasWinCondition && progress > threshold
    }
  );

  const barStyle = {
    width: pct(progress)
  };

  let winIndicator = null;
  if (hasWinCondition) {
    const winIndicatorStyle = { left: pct(threshold) };
    winIndicator = (
      <div
        className={`absolute border border-l top ${hClass}`}
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
    <div>
      <h5 className="txt-h5 txt-bold">{label}</h5>
      {progressBar}
    </div>
  );
}
