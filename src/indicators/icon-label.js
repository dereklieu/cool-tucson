'use strict';
import React from 'react';
import c from 'classnames';

export function IconLabel(props) {
  const {
    icon,
    label,
    size = 12
  } = props;

  const iconClass = c(
    'icon',
    `w${size}`,
    `h${size}`,
    {
      'flex-child': !!label
    }
  );

  const containerClass = c(
    {
      'flex-parent flex-parent--center-main': !!label
    }
  );

  return (
    <div className={containerClass}>
      <svg className={iconClass}>
        <use xlinkHref={`#icon-${icon}`} />
      </svg>
      { label ? (
        <div className="flex-child">
          <label>{label}</label>
        </div>
      ) : null }
    </div>
  );
}
