'use strict';
import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import c from 'classnames';

import { getIntervention } from '../interventions/interventions'
import { interventionSelectors } from '../store/intervention-selectors';
import { boardSelectors } from '../store/board-selectors';
import { scoreSelectors } from '../store/score-selectors';
import constants from '../constants';
import { pillClass, formatCost } from '../util/style-util';

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
        <h5 className="txt-h5">The Bulldozer</h5>
        <p>Removes improvements and recovers resources.</p>
      </div>
    )
  }

  renderIntervention(intervention) {
    const isDisabled = intervention.cost > this.props.currency;
    const cost = formatCost(intervention.cost);
    const isWaterFeatures = intervention.name === 'Water features';

    return (
      <div className="prose">
        <h5 className="txt-h5">{intervention.name}</h5>
        <p>
          <span className={`${pillClass(intervention.type)} inline-block`}>
            {intervention.type}
          </span>
          <span className={`${pillClass('$')} inline-block ml6`}>{cost}</span>
        </p>
        {isDisabled ? (
          <p className="txt-bold color-red">Not enough resources</p>
        ) : null}
        {isWaterFeatures ? (
          <p className="txt-bold color-red">Requires uban park</p>
        ) : null}
      </div>
    );
  }

  renderLocale() {
    const { locale } = this.props;
    const descriptions = {
      t: 'the weather is nice all year round',
      hh: 'the weather is hot and muggy',
      hd: 'the sun shines hot and dry'
    };
    return (
      <div className="prose txt-m">
        <h5 className="txt-h5">You are in <strong>{constants.LOCALES[locale]}</strong></h5>
        <p>Here, {descriptions[locale]}. Click to try someplace new.</p>
      </div>
    );
  }

  renderCopy() {
    return (
      <div className="prose txt-m">
        <p>Copied!</p>
      </div>
    );
  }

  renderScore(name) {
    let body;
    switch (name) {
      case constants.SCORE_CURRENCY:
        body = 'Every community has limited funds and resources, which determines how many improvements you can make. Use the bulldozer to remove improvements and reclaim resources if you run out.';
        break;
      case constants.SCORE_SOCIAL:
        body = 'Extreme heat is no fun for anyone. This captures the positive impacts from your improvements that are felt by people, such as a more comfortable climate, or improved health outcomes.';
        break;
      case constants.SCORE_ENVIRO:
        body = 'The environment thanks you! This captures the positive impacts from your improvements that protect things like native wildlife, biodiversity, and natural resource sustainability.';
        break;
    }
    return (
      <div className="prose txt-m">
        <p>{body}</p>
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

    if (name === constants.LOCALE_CHANGE) return this.renderLocale();
    if (name === constants.ERASER) return this.renderEraser();
    if (name === constants.COPY) return this.renderCopy();
    if (name.slice(0, 5) === 'SCORE') return this.renderScore(name);

    const intervention = this.getIntervention(name);
    if (intervention) return this.renderIntervention(intervention);

    return null;
  }

  render() {
    if (this.props.activeIntervention) return null;

    const className=c(
      'px12 py12 txt-m round bg-white color-black opacity100 wmax360 shadow shadow-darken10'
    );
    return (
      <ReactTooltip
        place="bottom"
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
  activeIntervention: interventionSelectors.active(state),
  locale: boardSelectors.locale(state),
  currency: scoreSelectors.currency(state)
});

Tooltip = connect(mapStateToProps)(Tooltip);

export { Tooltip };
