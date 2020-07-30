'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { settingActionCreators } from '../store/setting-action-creators';

let Locales = class Locales extends React.PureComponent {
  render() {
    return (
      <div className="scroll-hidden viewport-full flex-parent flex-parent--column flex-parent--center-main">
        <div className="flex-child">
          <div className="flex-parent flex-parent--center-main">


          </div>
        </div>
      </div>
    );
  }
};

const mapDispatch = {
  changeLocale: settingActionCreators.changeLocale
};

Locales = connect(null, mapDispatch)(Locales);

export { Locales }
