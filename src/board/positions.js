import sprites from '../assets/img/sprites/board/spritesheet.json';

const positions = [
  {
    id: 'pb_house_1',
    type: 'pb_house',
    sprite: sprites.frames['pb-house-base.png'].frame,
    placement: {
      left: 708.5,
      top: 78.1
    }
  },
  {
    id: 'pb_apartment_1',
    type: 'pb_apartment',
    sprite: sprites.frames['pb-apartment-base.png'].frame,
    placement: {
      left: 896,
      top: 51.8
    }
  },
  {
    id: 'pb_apartment_2',
    type: 'pb_apartment',
    sprite: sprites.frames['pb-apartment-base.png'].frame,
    placement: {
      left: 1075.6,
      top: 155.2
    }
  },
  {
    id: 'pb_house_2',
    type: 'pb_house',
    sprite: sprites.frames['pb-house-base.png'].frame,
    placement: {
      left: 1279,
      top: 407.5
    }
  },
  {
    id: 'pb_house_3',
    type: 'pb_house',
    sprite: sprites.frames['pb-house-base.png'].frame,
    placement: {
      left: 1464.5,
      top: 514.5
    }
  },
  {
    id: 'oa_base',
    type: 'oa',
    sprite: sprites.frames['oa-base.png'].frame,
    placement: {
      left: 486.4,
      top: 317.9
    }
  },
  {
    id: 'th_base',
    type: 'th',
    sprite: sprites.frames['th-base.png'].frame,
    placement: {
      left: -55.1,
      top: 53.7
    }
  },
];

export { positions };
