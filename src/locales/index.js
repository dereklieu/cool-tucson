'use strict';
import React from 'react';
import { connect } from 'react-redux';

import { boardActionCreators } from '../store/board-action-creators';
import { Title } from '../app/title';
import { Locale } from './locale';

let Locales = class Locales extends React.PureComponent {
  changeLocale = (type) => {
    this.props.changeLocale(type);
  };

  render() {
    return (
      <>
        <div className="fixed top right bottom left gradient-red" />
        <div className="absolute top left w-full">
          <div className="align-center">
            <Title />
            <h4 className="txt-h4 txt-bold mt12 mb24">Welcome to Chill City! Pick a region and let's get started.</h4>
          </div>
          <div className="flex-parent flex-parent--center-cross flex-parent--center-main flex-parent--wrap">
            <div className="flex-child mx12 my12">
              <Locale
                type="hd"
                size={300}
                onClick={this.changeLocale}
              />
            </div>
            <div className="flex-child mx12 my12">
              <Locale
                type="hh"
                size={300}
                onClick={this.changeLocale}
              />
            </div>
            <div className="flex-child mx12 my12">
              <Locale
                type="t"
                size={300}
                onClick={this.changeLocale}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
};

const mapDispatch = {
  changeLocale: boardActionCreators.changeLocale
};

Locales = connect(null, mapDispatch)(Locales);

export { Locales }
