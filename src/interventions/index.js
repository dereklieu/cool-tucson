'use strict';
import React from 'react';
import { connect } from 'react-redux';

import { settingSelectors } from '../store/setting-selectors';
import { Intervention } from './intervention';
import constants from '../constants';
import interventions from '../assets/data/interventions.json';

const cost = 5; // TODO: replace with actual cost

const parsedInterventions = interventions.map(d => {
  return {
    score: {
      hd: {
        cost,
        environmental: d.environmental_hd,
        social: d.social_hd
      },
      hh: {
        cost,
        environmental: d.environmental_hh,
        social: d.social_hh
      },
      t: {
        cost,
        environmental: d.environmental_t,
        social: d.social_t
      }
    },
    description: d.description,
    name: d.intervention,
    type: d.location
  };
});

let Interventions = class Interventions extends React.PureComponent {
  renderInterventions() {
    const { locale } = this.props;

    return parsedInterventions.map(d => (
      <div className="flex-child" key={d.name} data-tip={d.name}>
        <div className="mx6 border round">
          <Intervention
            name={d.name}
            score={d.score[locale]}
            dragType={constants.NEW_INTERVENTION}
          />
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className="flex-parent flex-parent--center-main">
        {this.renderInterventions()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locale: settingSelectors.locale(state)
});

Interventions = connect(
  mapStateToProps
)(Interventions);

export { Interventions };
