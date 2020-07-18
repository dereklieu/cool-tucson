'use strict';
import React from 'react';
import { connect } from 'react-redux';

import { settingSelectors } from '../store/setting-selectors';
import { boardSelectors } from '../store/board-selectors';
import { boardActionCreators } from '../store/board-action-creators';
import { Intervention } from './intervention';
import { interventions } from './interventions';
import { groupBy } from '../util/group-by';
import constants from '../constants';

const interventionGroups = groupBy(interventions, 'type');

let Interventions = class Interventions extends React.PureComponent {
  changeInterventionType = (e) => {
    this.props.changeInterventionType(e.target.value);
  };

  renderGroupToggle = () => {
    const { interventionType } = this.props;
    const groups = Object.keys(interventionGroups);
    return (
      <select onChange={this.changeInterventionType} value={interventionType}>
        {groups.map(group => (
          <option key={group} value={group}>{group}</option>
        ))}
      </select>
    );
  };

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
    const activeGroup = interventionGroups[interventionType];
    return (
      <div className="round border">
        {this.renderGroupToggle()}
        {this.renderGroup(activeGroup)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locale: settingSelectors.locale(state),
  interventionType: boardSelectors.interventionType(state)
});

const mapDispatch = {
  changeInterventionType: boardActionCreators.changeInterventionType
};

Interventions = connect(
  mapStateToProps,
  mapDispatch
)(Interventions);

export { Interventions };
