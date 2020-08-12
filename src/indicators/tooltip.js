'use strict';
import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import c from 'classnames';

import { getIntervention } from '../interventions/interventions'
import { settingSelectors } from '../store/setting-selectors';
import constants from '../constants';
import { pillClass } from '../util/style-util';

const offset = {
  top: 10,
  left: 10,
  right: 10,
  bottom: 10
};

let Tooltip = class Tooltip extends React.PureComponent {
  renderIntervention(intervention) {
    return (
      <div className="prose">
        <h5 className="txt-h5">{intervention.name}</h5>
        <p>
          <span className={`${pillClass(intervention.type)} inline-block`}>
            {intervention.type}
          </span>
          <span className={`${pillClass('$')} inline-block ml6`}>$$</span>
        </p>
      </div>
    );
  }

  renderEraser() {
    return (
      <div className="prose">
        <h5 className="txt-h5">Revert</h5>
      </div>
    )
  }

  getIntervention = (name) => {
    if (name.indexOf(constants.NEW_INTERVENTION) < 0) return undefined;
    return getIntervention(
      name.slice(constants.NEW_INTERVENTION.length + 1)
    );
  };

  getContent = (name) => {
    if (!name) return null;

    const intervention = this.getIntervention(name);
    if (intervention) return this.renderIntervention(intervention);

    const isEraser = name === constants.ERASER;
    if (isEraser) return this.renderEraser();
    return null;
  }

  render() {
    const className=c(
      'px12 py12 txt-s round bg-white color-black opacity100'
    );
    return (
      <ReactTooltip
        className={className}
        border={true}
        borderColor="#000000"
        offset={offset}
        effect="solid"
        getContent={this.getContent}
      />
    );
  }
}

const mapStateToProps = state => ({
  locale: settingSelectors.locale(state)
});

Tooltip = connect(mapStateToProps)(Tooltip);

export { Tooltip };
