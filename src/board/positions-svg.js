import stBase from '../assets/img/svg/plots/st-base.svg';
import pbHouseBase from '../assets/img/svg/plots/pb-house-base.svg';
import pbApartmentBase from '../assets/img/svg/plots/pb-apartment-base.svg';
import oaBase from '../assets/img/svg/plots/oa-base.svg';
import thBase from '../assets/img/svg/plots/th-base.svg';

import { interventions } from './interventions-svg';

const svgs = {
  stBase: {
    id: stBase.id,
    w: 1929,
    h: 699.6
  },
  pbHouseBase: {
    id: pbHouseBase.id,
    w: 319.8,
    h: 225.5
  },
  pbApartmentBase: {
    id: pbApartmentBase.id,
    w: 353.1,
    h: 368.5
  },
  oaBase: {
    id: oaBase.id,
    w: 727.6,
    h: 420.9
  },
  thBase: {
    id: thBase.id,
    w: 763.5,
    h: 494.1
  }
}

const positions = [
  {
    id: 'st_base',
    type: 'Street',
    svg: svgs.stBase,
    placement: {
      x: -108.3,
      y: 208.4,
    },
    interventions: {}
  },
  {
    id: 'pb_house_1',
    type: 'Private buildings',
    variant: 'house',
    svg: svgs.pbHouseBase,
    placement: {
      x: 708.5,
      y: 78.1
    },
    interventions: interventions.privateBuildingHouse
  },
  {
    id: 'pb_apartment_1',
    type: 'Private buildings',
    variant: 'apartment',
    svg: svgs.pbApartmentBase,
    placement: {
      x: 896,
      y: 51.8
    },
    interventions: interventions.privateBuildingApartment
  },
  {
    id: 'pb_apartment_2',
    type: 'Private buildings',
    variant: 'apartment',
    svg: svgs.pbApartmentBase,
    placement: {
      x: 1075.6,
      y: 155.2
    },
    interventions: interventions.privateBuildingApartment
  },
  {
    id: 'pb_house_2',
    type: 'Private buildings',
    variant: 'house',
    svg: svgs.pbHouseBase,
    placement: {
      x: 1279,
      y: 407.5
    },
    interventions: interventions.privateBuildingHouse
  },
  {
    id: 'pb_house_3',
    type: 'Private buildings',
    variant: 'house',
    svg: svgs.pbHouseBase,
    placement: {
      x: 1464.5,
      y: 514.5
    },
    interventions: interventions.privateBuildingHouse
  },
  {
    id: 'oa_base',
    type: 'Open area',
    svg: svgs.oaBase,
    placement: {
      x: 486.4,
      y: 317.9
    },
    interventions: interventions.openArea
  },
  {
    id: 'th_base',
    type: 'Town hall',
    svg: svgs.thBase,
    placement: {
      x: -55.1,
      y: 53.7
    },
    interventions: interventions.townHall
  }
];

export { positions };
