import React, { useState } from 'react';
import { connect } from 'react-redux';
import c from 'classnames';
import { IconLabel } from '../indicators/icon-label';
import { Title } from './title';
import { Locale } from '../locales/locale';
import { Modal } from '../indicators/modal';
import { pct, colorText, isHDPR } from '../util/style-util';
import constants from '../constants';

import info from '../assets/img/info/info.png';
import coolRoof from '../assets/img/info/cool-roof.svg';

import { boardActionCreators } from '../store/board-action-creators';
import { boardSelectors } from '../store/board-selectors';

const infoStyle = {
  width: pct(100)
}

let Menu = (props) => {
  const [showModal, toggleModal] = useState(false);
  const localeIconSize = isHDPR() ? 48 : 90;

  return (
    <div className="relative">
      <div className="align-center">
        <Title />
        <h4 className="txt-h4 mt12 mb24">Tackle urban heat by <strong>tapping an improvement</strong>.</h4>
      </div>
      <div className="absolute top left">
        <div className="mt12 ml12" data-tip={constants.LOCALE_CHANGE} onClick={() => props.changeLocale(null)}>
          <Locale type={props.locale} size={localeIconSize} onClick={x => x} />
        </div>
      </div>
      <div className="absolute top right" onClick={() => toggleModal(!showModal)}>
        <button className="btn btn--transparent py3 px3 mt12 mr12 color-black transition" onClick={props.onClick}>
          <IconLabel icon="info" size={36} />
        </button>
      </div>
      {showModal ? (
        <Modal onExit={() => toggleModal(false)}>
          <div className="py24 px24 round shadow shadow-darken10">
            <div className="prose txt-l">
              <img src={info} style={infoStyle} />
              <p>It's 🔥🔥 {colorText('hot!', 'color-red')} Drag improvements like
                {' '}
                <svg className="inline icon w24 h24"><use xlinkHref={`#${coolRoof.id}`} /></svg>
                {' '}
                {colorText('cool roofs', 'color-blue')} onto the map to chill things out.</p>
              <p>Improvements will raise your {colorText('social', 'color-blue')} and {colorText('environmental', 'color-green')} score, but deplete your resources.</p>
              <p>Once you reach your goal, it's up to you to build the chillest city!</p>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  locale: boardSelectors.locale(state)
});

const mapDispatch = {
  changeLocale: boardActionCreators.changeLocale
};

Menu = connect(
  mapStateToProps,
  mapDispatch
)(Menu);

export { Menu };

