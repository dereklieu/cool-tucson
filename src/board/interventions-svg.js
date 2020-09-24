// Town hall
import publicEd from '../assets/img/svg/th/public-ed.svg';
import coolingCenter from '../assets/img/svg/th/cooling-center.svg';

// Private building house
import houseWasteHeat from '../assets/img/svg/pb-house/waste-heat.svg';
import houseGreenRoof from '../assets/img/svg/pb-house/green-roof.svg';
import houseCoolRoof from '../assets/img/svg/pb-house/cool-roof.svg';
import houseShadeStructure from '../assets/img/svg/pb-house/shade-structure.svg';
import houseUrbanCopy from '../assets/img/svg/pb-house/urban-canopy.svg';

const townHall = {
  'Public education and communication': {
    svg: {
      id: publicEd.id,
      w: 105.5,
      h: 212.4
    },
    placement: {
      x: 123.6,
      y: -38.7,
      z: 1
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
      y: 244.1,
      z: 1
    }
  }
};

const privateBuildingHouse = {
  'Waste heat reduction': {
    svg: {
      id: houseWasteHeat.id,
      w: 106.8,
      h: 72.3
    },
    placement: {
      x: 126.1,
      y: -0.9,
      z: 1,
    }
  },
  'Green roofs and walls': {
    svg: {
      id: houseGreenRoof.id,
      w: 165.6,
      h: 158.9
    },
    placement: {
      x: 85.6,
      y: 14,
      z: 1,
    },
    removes: 'Cool roofs and walls'
  },
  'Cool roofs and walls': {
    svg: {
      id: houseCoolRoof.id,
      w: 177.3,
      h: 177.7
    },
    placement: {
      x: 72.3,
      y: 0,
      z: 0
    },
    removes: 'Green roofs and walls'
  },
  'Shade structures': {
    svg: {
      id: houseShadeStructure.id,
      w: 79.9,
      h: 77.9
    },
    placement: {
      x: 190.5,
      y: 116,
      z: 2
    }
  },
  'Urban tree canopy': {
    svg: {
      id: houseUrbanCopy.id,
      w: 208.3,
      h: 152.7
    },
    placement: {
      x: 0.1,
      y: 72.6,
      z: 1
    }
  }
};

export const interventions = {
  townHall,
  privateBuildingHouse
};
