'use strict';

export function groupBy(array, key) {
  const groups = {};
  for (let i = 0; i < array.length; ++i) {
    const k = array[i][key];
    groups[k] = groups[k] || [];
    groups[k].push(array[i]);
  }
  return groups;
}
