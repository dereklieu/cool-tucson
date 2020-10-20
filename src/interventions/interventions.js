import i from '../assets/data/interventions.json';

const interventions = i.map(d => {
  return {
    score: {
      hd: {
        cost: Number(d.cost),
        environmental: Number(d.environmental_hd),
        social: Number(d.social_hd)
      },
      hh: {
        cost: Number(d.cost),
        environmental: Number(d.environmental_hh),
        social: Number(d.social_hh)
      },
      t: {
        cost: Number(d.cost),
        environmental: Number(d.environmental_t),
        social: Number(d.social_t)
      }
    },
    cost: d.cost,
    description: d.description,
    name: d.intervention,
    type: d.location,
    outcomes: d.outcomes.split('\n').map(o => o.trim())
  };
}).reverse();

const allOutcomes = new Set();
const types = new Set();

interventions.forEach(i => {
  types.add(i.type);
  i.outcomes.forEach(o => {
    allOutcomes.add(o);
  });
});

const interventionTypes = Array.from(types);

const getIntervention = (name) => {
  return interventions.find(i => i.name === name);
};

export {
  interventions,
  interventionTypes,
  getIntervention,
  allOutcomes
};
