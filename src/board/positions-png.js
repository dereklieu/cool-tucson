import sprites from '../assets/img/sprites/board/spritesheet.json';

const positions = [
  {
    id: 'st_base',
    type: 'Street',
    sprite: sprites.frames['st-base.png'].frame,
    placement: {
      x: -108.3,
      y: 208.4,
    }
  },
  {
    id: 'pb_house_1',
    type: 'Private buildings',
    variant: 'house',
    sprite: sprites.frames['pb-house-base.png'].frame,
    placement: {
      x: 708.5,
      y: 78.1
    }
  },
  {
    id: 'pb_apartment_1',
    type: 'Private buildings',
    variant: 'apartment',
    sprite: sprites.frames['pb-apartment-base.png'].frame,
    placement: {
      x: 896,
      y: 51.8
    }
  },
  {
    id: 'pb_apartment_2',
    type: 'Private buildings',
    variant: 'apartment',
    sprite: sprites.frames['pb-apartment-base.png'].frame,
    placement: {
      x: 1075.6,
      y: 155.2
    }
  },
  {
    id: 'pb_house_2',
    type: 'Private buildings',
    variant: 'house',
    sprite: sprites.frames['pb-house-base.png'].frame,
    placement: {
      x: 1279,
      y: 407.5
    }
  },
  {
    id: 'pb_house_3',
    type: 'Private buildings',
    variant: 'house',
    sprite: sprites.frames['pb-house-base.png'].frame,
    placement: {
      x: 1464.5,
      y: 514.5
    }
  },
  {
    id: 'oa_base',
    type: 'Open area',
    sprite: sprites.frames['oa-base.png'].frame,
    placement: {
      x: 486.4,
      y: 317.9
    }
  },
  {
    id: 'th_base',
    type: 'Town hall',
    sprite: sprites.frames['th-base.png'].frame,
    placement: {
      x: -55.1,
      y: 53.7
    }
  },
];

export { positions };
