import i from '../assets/data/interventions.json';

const cost = 5; // TODO: replace with actual cost

export const interventions = i.map(d => {
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
    name: d.intervention,
    type: d.location
  };
});