import publicEd from '../assets/img/svg/th/public-ed.svg';
import coolingCenter from '../assets/img/svg/th/cooling-center.svg';

const townHall = {
  'Public education and communication': {
    svg: {
      id: publicEd.id,
      w: 105.5,
      h: 212.4
    },
    placement: {
      x: 123.6,
      y: -38.7
    },
    post: true
  },
  'Cooling centers': {
    svg: {
      id: coolingCenter.id,
      w: 275.8,
      h: 99.6
    },
    placement: {
      x: 204.6,
      y: 244.1
    }
  }
};

export const interventions = {
  townHall
};
