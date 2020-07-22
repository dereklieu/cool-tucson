'use strict';
import React from 'react';
import { connect } from 'react-redux';

import { settingSelectors } from '../store/setting-selectors';
import { boardSelectors } from '../store/board-selectors';
import { boardActionCreators } from '../store/board-action-creators';
import { Intervention } from './intervention';
import { Description } from './description';
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
    const {
      locale,
      changeActiveIntervention,
      activeIntervention
    } = this.props;
    return (
      <div className="flex-child" key={d.name} data-tip={d.name}>
        <Intervention
          id={d.name}
          name={d.name}
          interventionType={d.type}
          isActive={d.name === activeIntervention}
          changeActiveIntervention={changeActiveIntervention}
          score={d.score[locale]}
          dragType={constants.NEW_INTERVENTION}
        />
      </div>
    );
  };

  render() {
    const {
      interventionType,
      activeIntervention
    } = this.props;
    const activeGroup = interventionGroups[interventionType];
    return (
      <div className="flex-parent flex-parent--column flex-parent--center-cross">
        <div className="flex-child mb60">
          <Description activeIntervention={activeIntervention} />
        </div>
        <div className="flex-child mb30">
          {this.renderGroupToggle()}
        </div>
        <div className="flex-child">
          {this.renderGroup(activeGroup)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locale: settingSelectors.locale(state),
  interventionType: boardSelectors.interventionType(state),
  activeIntervention: boardSelectors.activeIntervention(state)
});

const mapDispatch = {
  changeActiveIntervention: boardActionCreators.changeActiveIntervention,
  changeInterventionType: boardActionCreators.changeInterventionType
};

Interventions = connect(
  mapStateToProps,
  mapDispatch
)(Interventions);

export { Interventions };
