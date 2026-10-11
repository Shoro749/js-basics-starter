/** @typedef {import('./normalize.js').Show} Show */

/**
 * @typedef {object} GenreStats
 * @property {number} count скільки серіалів мають цей жанр
 * @property {number | null} averageRating середня оцінка цих серіалів
 */

/**
 * C4. Рахує статистику для кожного жанру.
 * Специфікація — ТЗ, C4.
 *
 * @param {Show[]} shows
 * @returns {Record<string, GenreStats>} ключ — назва жанру
 */
export function genreStats(shows) {
  const stats = {};

  for (const show of shows) {
    for (const genre of show.genres) {
      if (!Object.hasOwn(stats, genre)) {
        stats[genre] = {
          count: 0,
          ratingSum: 0,
          ratingCount: 0,
          averageRating: null,
        };
      }

      const genreStat = stats[genre];

      genreStat.count += 1;

      if (show.rating !== null && show.rating !== undefined) {
        genreStat.ratingSum += show.rating;
        genreStat.ratingCount += 1;
      }
    }
  }

  for (const genre of Object.keys(stats)) {
    const genreStat = stats[genre];

    genreStat.averageRating = genreStat.ratingCount === 0 ? null
        : Math.round((genreStat.ratingSum / genreStat.ratingCount) * 10,) / 10;

    delete genreStat.ratingSum;
    delete genreStat.ratingCount;
  }

  return stats;
}
