import i from '../assets/data/interventions.json';

const cost = 5; // TODO: replace with actual cost

const interventions = i.map(d => {
  return {
    score: {
      hd: {
        cost,
        environmental: Number(d.environmental_hd),
        social: Number(d.social_hd)
      },
      hh: {
        cost,
        environmental: Number(d.environmental_hh),
        social: Number(d.social_hh)
      },
      t: {
        cost,
        environmental: Number(d.environmental_t),
        social: Number(d.social_t)
      }
    },
    description: d.description,
    id: d.intervention,
    name: d.intervention,
    type: d.location
  };
});

const types = new Set();
interventions.forEach(i => {
  types.add(i.type);
});

const interventionTypes = Array.from(types);

const baseTypes = {
  'Private buildings': 'Basic building',
  'Open area': 'Parking lot',
  Street: 'Basic street',
  'Town hall': 'Basic town hall'
};

const getBaseIntervention = (type) => {
  const name = baseTypes[type];
  return {
    score: {},
    description: 'Clears any existing interventions',
    id: 'base',
    name,
    type
  };
};

const getIntervention = (name) => {
  const isBaseType = Object.keys(baseTypes).find(type =>
    baseTypes[type] === name
  );
  if (isBaseType) return getBaseIntervention(isBaseType);
  return interventions.find(i => i.name === name);
};

export {
  interventions,
  interventionTypes,
  baseTypes,
  getBaseIntervention,
  getIntervention
};
