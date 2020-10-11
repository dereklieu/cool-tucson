'use strict';
import React from 'react';
import { px } from '../util/style-util';

import constants from '../constants';

import oaUrbanPark from '../assets/img/svg/interventions/oa-urban-park.svg';
import oaWaterFeature from '../assets/img/svg/interventions/oa-water-feature.svg';
import pbCoolRoof from '../assets/img/svg/interventions/pb-cool-roof.svg';
import pbGreenRoof from '../assets/img/svg/interventions/pb-green-roof.svg';
import pbShade from '../assets/img/svg/interventions/pb-shade.svg';
import pbUrbanTree from '../assets/img/svg/interventions/pb-urban-tree.svg';
import pbWasteHeat from '../assets/img/svg/interventions/pb-waste-heat.svg';
import stCoolPavement from '../assets/img/svg/interventions/st-cool-pavement.svg';
import stDrinkingWater from '../assets/img/svg/interventions/st-drinking-water.svg';
import stGreenInfrastructure from '../assets/img/svg/interventions/st-green-infrastructure.svg';
import thCoolingCenter from '../assets/img/svg/interventions/th-cooling-center.svg';
import thPublicEducation from '../assets/img/svg/interventions/th-public-education.svg';

import bulldozer from '../assets/img/svg/interventions/bulldozer.svg';

const svgs = {
  'oa-urban-park': oaUrbanPark,
  'oa-water-features': oaWaterFeature,
  'pb-cool-roofs-and-walls': pbCoolRoof,
  'pb-green-roofs-and-walls': pbGreenRoof,
  'pb-shade-structures': pbShade,
  'pb-urban-tree-canopy': pbUrbanTree,
  'pb-waste-heat-reduction': pbWasteHeat,
  's-cool-pavement': stCoolPavement,
  's-drinking-water': stDrinkingWater,
  's-green-infrastructure': stGreenInfrastructure,
  'th-cooling-centers': thCoolingCenter,
  'th-public-education-and-communication': thPublicEducation
};

const getSvg = (intervention, type) => {
  const prefix = type
    .toLowerCase()
    .split(' ')
    .map(s => s.charAt(0))
    .join('');
  const name = intervention.toLowerCase().split(' ').join('-');
  const key = `${prefix}-${name}`;
  const svg = svgs[key];
  if (!svg) throw new Error(`svg ${key} not found`);
  return svg;
};

export const Icon = (props) => {
  const {
    size,
    name,
    type,
    className
  } = props;

  let svg

  if (name === constants.ERASER) {
    svg = bulldozer;
  } else {
    svg = getSvg(name, type);
  }

  const style = {
    width: px(size),
    height: px(size)
  };

  return (
    <div className={className} style={style}>
      <svg className="icon" style={style}>
        <use xlinkHref={`#${svg.id}`} />
      </svg>
    </div>
  );
};
