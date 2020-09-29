'use strict';
import React from 'react';
import { connect } from 'react-redux';
import Clipboard from 'clipboard';
import { IconLabel } from './icon-label';

let CopyLink = class CopyLink extends React.PureComponent {
  render() {
    return (
      <div className="flex-parent flex-parent--center-cross">
        <input type="text" className="flex-child input" readonly={true} />
        <button type="button" className="flex-child btn round ml3">
          <IconLabel size="18" inline={true} icon="clipboard" />
        </button>
      </div>
    );
  }
};

export { CopyLink };
