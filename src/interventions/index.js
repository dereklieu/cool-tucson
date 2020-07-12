'use strict';
import React from 'react';
import { connect } from 'react-redux';

import { settingSelectors } from '../store/setting-selectors';
import { Intervention } from './intervention';
import { interventions } from './interventions';
import { groupBy } from '../util/group-by';
import constants from '../constants';

let Interventions = class Interventions extends React.PureComponent {
  renderGroup = (name, interventions) => {
    return (
      <div className="flex-child" key={name}>
        <h3>{name}</h3>
        <div className="flex-parent flex-parent--center-cross">
          {interventions.map(this.renderIntervention)}
        </div>
      </div>
    );
  };

  renderIntervention = (d) => {
    const { locale } = this.props;
    return (
      <div className="flex-child" key={d.name} data-tip={d.name}>
        <Intervention
          id={d.name}
          name={d.name}
          score={d.score[locale]}
          dragType={constants.NEW_INTERVENTION}
        />
      </div>
    );
  };

  render() {
    const groups = groupBy(interventions, 'type');
    console.log(interventions[0]['type'], groups);
    return (
      <div className="flex-parent flex-parent--column">
        {Object.keys(groups).map(name => this.renderGroup(name, groups[name]))}
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
