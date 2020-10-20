import React from 'react';
import { connect } from 'react-redux';
import { IconLabel } from '../indicators/icon-label';
import { Title } from './title';
import { Locale } from '../locales/locale';
import { isHDPR, colorText } from '../util/style-util';
import constants from '../constants';

import info from '../assets/img/info/info.png';
import coolRoof from '../assets/img/info/cool-roof.svg';

import { interventionActionCreators } from '../store/intervention-action-creators';
import { boardActionCreators } from '../store/board-action-creators';
import { boardSelectors } from '../store/board-selectors';

let Menu = (props) => {
  const localeIconSize = isHDPR() ? 48 : 90;

  return (
    <div className="relative">
      <div className="align-center unselectable">
        <Title />
        <h4 className="txt-h4 mt12 mb24">Tackle {colorText('urban heat', 'color-red')} with cool improvements.</h4>
      </div>
      <div className="absolute top left">
        <div className="mt12 ml12" data-tip={constants.LOCALE_CHANGE} onClick={() => props.changeLocale(null)}>
          <Locale type={props.locale} size={localeIconSize} onClick={x => x} />
        </div>
      </div>
      <div className="absolute top right">
        <button
          className="btn btn--transparent py3 px3 mt12 mr12 color-black transition"
          onClick={() => props.setIntervention(constants.INTERVENTION_INTRO)}
        >
          <IconLabel icon="info" size={36} />
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  locale: boardSelectors.locale(state)
});

const mapDispatch = {
  changeLocale: boardActionCreators.changeLocale,
  setIntervention: interventionActionCreators.setIntervention
};

Menu = connect(
  mapStateToProps,
  mapDispatch
)(Menu);

export { Menu };

