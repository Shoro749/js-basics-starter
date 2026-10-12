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
  const multiplier = direction === 'desc' ? -1 : 1;

  return [...shows].sort((a, b) => {
    const left = a[key];
    const right = b[key];

    if (left == null && right == null) return 0;
    if (left == null) return 1;
    if (right == null) return -1;

    let comparison;

    if (key === 'name') {
      comparison = String(left).localeCompare(
        String(right),
        undefined,
        { sensitivity: 'base' },
      );
    } else {
      comparison = Number(left) - Number(right);
    }

    return comparison * multiplier;
  });
}
