'use strict';
import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import c from 'classnames';

import { getIntervention } from '../interventions/interventions'
import { settingSelectors } from '../store/setting-selectors';
import { boardSelectors } from '../store/board-selectors';
import constants from '../constants';
import { pillClass } from '../util/style-util';

const offset = {
  top: 10,
  left: 10,
  right: 10,
  bottom: 10
};

let Tooltip = class Tooltip extends React.PureComponent {
  renderEraser() {
    return (
      <div className="prose">
        <h5 className="txt-h5">Revert</h5>
        <p>Removes any improvements</p>
      </div>
    )
  }

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

  getIntervention = (name) => {
    if (name.indexOf(constants.NEW_INTERVENTION) < 0) return undefined;
    return getIntervention(
      name.slice(constants.NEW_INTERVENTION.length + 1)
    );
  };

  getContent = (name) => {
    if (!name) return null;

    if (name === constants.ERASER) return this.renderEraser();

    const intervention = this.getIntervention(name);
    if (intervention) return this.renderIntervention(intervention);

    return null;
  }

  render() {
    const className=c(
      'px12 py12 txt-s round bg-white color-black opacity100 wmax360'
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
  locale: settingSelectors.locale(state),
  badges: boardSelectors.badges(state)
});

Tooltip = connect(mapStateToProps)(Tooltip);

export { Tooltip };
