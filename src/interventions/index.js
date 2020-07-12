'use strict';
import React from 'react';
import { connect } from 'react-redux';

import { settingSelectors } from '../store/setting-selectors';
import { boardSelectors } from '../store/board-selectors';
import { Intervention } from './intervention';
import { interventions } from './interventions';
import { groupBy } from '../util/group-by';
import constants from '../constants';

let Interventions = class Interventions extends React.PureComponent {
  renderGroup = (interventions) => {
    return (
      <div className="flex-parent flex-parent--center-cross flex-parent--center-main">
        {interventions.map(this.renderIntervention)}
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
    const { interventionType } = this.props;
    const groups = groupBy(interventions, 'type');
    const activeGroup = groups[interventionType];
    return (
      <div className="flex-parent flex-parent--column">
        <div className="flex-child">
          {this.renderGroup(activeGroup)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locale: settingSelectors.locale(state),
  interventionType: boardSelectors.interventionType(state)
});

Interventions = connect(
  mapStateToProps
)(Interventions);

export { Interventions };
