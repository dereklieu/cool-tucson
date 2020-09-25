// Town hall
import publicEd from '../assets/img/svg/th/public-ed.svg';
import coolingCenter from '../assets/img/svg/th/cooling-center.svg';

// Private building house
import houseWasteHeat from '../assets/img/svg/pb-house/waste-heat.svg';
import houseGreenRoof from '../assets/img/svg/pb-house/green-roof.svg';
import houseCoolRoof from '../assets/img/svg/pb-house/cool-roof.svg';
import houseShadeStructure from '../assets/img/svg/pb-house/shade-structure.svg';
import houseUrbanCopy from '../assets/img/svg/pb-house/urban-canopy.svg';

// Private building apartment
import aptWasteHeat from '../assets/img/svg/pb-apt/apt-waste-heat.svg';
import aptGreenRoof from '../assets/img/svg/pb-apt/apt-green-roof.svg';
import aptCoolRoof from '../assets/img/svg/pb-apt/apt-cool-roof.svg';
import aptShadeStructure from '../assets/img/svg/pb-apt/apt-shade-structure.svg';
import aptUrbanCopy from '../assets/img/svg/pb-apt/apt-urban-canopy.svg';

// Open area
import urbanPark from '../assets/img/svg/oa/urban-park.svg';
import water from '../assets/img/svg/oa/water.svg';

// Street
import drinkingWater from '../assets/img/svg/st/drinking-water.svg';
import greenInfrastructure from '../assets/img/svg/st/green-infrastructure.svg';
import coolPavement from '../assets/img/svg/st/cool-pavement.svg';

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

const privateBuildingApartment = {
  'Waste heat reduction': {
    svg: {
      id: aptWasteHeat.id,
      w: 50.7,
      h: 52
    },
    placement: {
      x: 130.6,
      y: -9.4,
      z: 1,
    }
  },
  'Green roofs and walls': {
    svg: {
      id: aptGreenRoof.id,
      w: 182.4,
      h: 265.9
    },
    placement: {
      x: 113.5,
      y: 22,
      z: 1
    },
    removes: 'Cool roofs and walls'
  },
  'Cool roofs and walls': {
    svg: {
      id: aptCoolRoof.id,
      w: 205.8,
      h: 302.8
    },
    placement: {
      x: 89.3,
      y: 0,
      z: 0
    },
    removes: 'Green roofs and walls'
  },
  'Shade structures': {
    svg: {
      id: aptShadeStructure.id,
      w: 144.3,
      h: 98.9
    },
    placement: {
      x: 75,
      y: 186.7,
      z: 1
    }
  },
  'Urban tree canopy': {
    svg: {
      id: aptUrbanCopy.id,
      w: 122.2,
      h: 113.6
    },
    placement: {
      x: 44.6,
      y: 218.1,
      z: 1
    }
  }
};

const openArea = {
  'Urban park': {
    svg: {
      id: urbanPark.id,
      w: 745,
      h: 434.7
    },
    placement: {
      x: -2,
      y: -6,
      z: 1
    }
  },
  'Water features': {
    svg: {
      id: water.id,
      w: 336.8,
      h: 197.8
    },
    placement: {
      x: 272.9,
      y: 148.5,
      z: 2
    },
    requires: 'Urban park'
  }
};

const street = {
  'Drinking water': {
    svg: {
      id: drinkingWater.id,
      w: 1065.8,
      h: 337.5
    },
    placement: {
      x: 287.3,
      y: 66,
      z: 1
    }
  },
  'Green infrastructure': {
    svg: {
      id: greenInfrastructure.id,
      w: 1309,
      h: 331.5
    },
    placement: {
      x: 162.9,
      y: 194.7,
      z: 2
    }
  },
  'Cool pavement': {
    svg: {
      id: coolPavement.id,
      w: 1929,
      h: 699.6
    },
    placement: {
      x: 0,
      y: 0,
      z: 0
    }
  }
};

export const interventions = {
  townHall,
  privateBuildingHouse,
  privateBuildingApartment,
  openArea,
  street
};
