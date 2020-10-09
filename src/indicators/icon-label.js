'use strict';
import React from 'react';
import c from 'classnames';

export function IconLabel(props) {
  const {
    inline,
    className,
    icon,
    label,
    size = 12
  } = props;

  const iconClass = c(
    'icon',
    `w${size}`,
    `h${size}`,
    {
      'flex-child': !!label,
      'inline': inline
    }
  );

  const containerClass = c(
    className,
    {
      'flex-parent flex-parent--center-main': !!label,
      'inline': inline,
      'block': !inline
    }
  );

  return (
    <span className={containerClass}>
      <svg className={iconClass}>
        <use xlinkHref={`#icon-${icon}`} />
      </svg>
      { label ? (
        <span className="flex-child">
          <label>{label}</label>
        </span>
      ) : null }
    </span>
  );
}
