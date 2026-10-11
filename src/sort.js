/** @typedef {import('./normalize.js').Show} Show */

/**
 * C3. Повертає новий масив серіалів, відсортований за полем `key`.
 * Специфікація — ТЗ, C3.
 *
 * @param {Show[]} shows
 * @param {'name' | 'year' | 'rating'} key
 * @param {'asc' | 'desc'} [direction]
 * @returns {Show[]}
 */
export function sortShows(shows, key, direction = 'asc') {
  let sortedShows = [...shows];
  sortedShows = sortedShows.sort((a, b) => a[key] - b[key]);

  if (direction === 'desc') sortedShows.reverse();
  return sortedShows;
}
