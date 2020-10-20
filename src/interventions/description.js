'use strict';
import React from 'react';
import c from 'classnames';
import { connect } from 'react-redux';
import { interventions, getIntervention } from './interventions';
import { interventionSelectors } from '../store/intervention-selectors';
import { interventionActionCreators } from '../store/intervention-action-creators';
import { pillClass, bgColor, formatCost, isHDPR, pct, colorText } from '../util/style-util';
import { Icon } from './icon';
import { IconLabel } from '../indicators/icon-label';
import constants from '../constants';

import info from '../assets/img/info/info.png';
import coolRoof from '../assets/img/info/cool-roof.svg';

const getNextIntervention = (name) => {
  if (name === constants.INTERVENTION_INTRO) {
    return interventions[0].name;
  }
  const i = interventions.findIndex(i => i.name === name);
  if (!interventions[i + 1]) return constants.INTERVENTION_INTRO;
  return interventions[i + 1].name;
};

const getPrevIntervention = (name) => {
  if (name === constants.INTERVENTION_INTRO) {
    return interventions[interventions.length - 1].name;
  }
  const i = interventions.findIndex(i => i.name === name);
  if (i === 0) return constants.INTERVENTION_INTRO;
  return interventions[i - 1].name;
};

const infoStyle = {
  width: pct(70)
}

let Description = class Description extends React.PureComponent {
  renderIcon = (intervention) => {
    if (!intervention) {
      return <img src={info} style={infoStyle} />;
    }
    const iconSize = isHDPR() ? 180 : 240;
    return (
      <Icon
        className="round-full bg-white"
        name={intervention.name}
        type={intervention.type}
        size={iconSize}
      />
    );
  };

  renderDescription = (intervention) => {
    if (!intervention) {
      return (
        <div className="prose txt-l">
          <p>It's 🔥🔥 {colorText('hot!', 'color-red')} Drag improvements like
            {' '}
            <svg className="inline icon w24 h24"><use xlinkHref={`#${coolRoof.id}`} /></svg>
            {' '}
            {colorText('cool roofs', 'color-blue')} onto the map to chill things out.</p>
          <p>Extreme heat (summertime temperatures that are much hotter than they have been in the past) is one of the most dangerous climate risks in communities today.</p>
          <p>Improvements will raise your {colorText('social', 'color-blue')} and {colorText('environmental', 'color-green')} score, but deplete your resources.</p>
          <p>It's up to you to build the chillest city by reaching the goal on the indicator to the right!</p>
        </div>
      );
    }

    const pillClassName = c(
      pillClass(intervention.type),
      'flex-child txt-s mr6 mb12'
    );

    const currencyClassName = c(
      pillClass('$'),
      'flex-child txt-s mb12'
    );

    return (
      <>
        <div className="flex-parent flex-parent--center-cross flex-parent--wrap">
          <h4 className="flex-child txt-h4 txt-bold mr6 mb12">{intervention.name}</h4>
          <div className={pillClassName}>{intervention.type}</div>
          <div className={currencyClassName}>{formatCost(intervention.cost)}</div>
        </div>
        <div className="prose">
          <p>{intervention.description}</p>
        </div>
      </>
    );
  };


  render() {
    const { activeIntervention, setIntervention } = this.props;
    if (!activeIntervention) return null;

    const isDescription = activeIntervention === constants.INTERVENTION_INTRO;
    const intervention = isDescription
      ? null : getIntervention(activeIntervention);

    const containerClass = c(
      'py24 px24 round shadow shadow-darken10',
      'hmax600 scroll-auto scroll-styled',
      intervention ? bgColor(intervention.type) : 'bg-gray-faint'
    );

    const inputClass = 'py60 px3 bg-lighten50 cursor-pointer color-blue-on-hover opacity75 opacity100-on-hover';

    return (
      <div className={containerClass}>
        <div className="pb24 flex-parent flex-parent--center-cross flex-parent--space-between-main">
          <button
            className={inputClass}
            onClick={() => setIntervention(getPrevIntervention(activeIntervention))}
          >
            <IconLabel
              icon="chevron-left"
              size={24}
            />
          </button>
          {this.renderIcon(intervention)}
          <button
            className={inputClass}
            onClick={() => setIntervention(getNextIntervention(activeIntervention))}
          >
            <IconLabel
              icon="chevron-right"
              size={24}
            />
          </button>
        </div>
        {this.renderDescription(intervention)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeIntervention: interventionSelectors.active(state)
});

const mapDispatch = {
  setIntervention: interventionActionCreators.setIntervention,
};

Description = connect(mapStateToProps, mapDispatch)(Description);
export { Description };
