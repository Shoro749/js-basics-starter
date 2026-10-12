/** @typedef {import('./normalize.js').Show} Show */

/**
 * @typedef {object} FilterOptions
 * @property {string | null} [query] частина назви
 * @property {string | null} [genre] жанр
 * @property {number | null} [minRating] мінімальна оцінка
 */

/**
 * C2. Повертає серіали, які відповідають усім заданим фільтрам.
 * Специфікація — ТЗ, C2.
 *
 * @param {Show[]} shows
 * @param {FilterOptions} [options]
 * @returns {Show[]}
 */
export function filterShows(shows, options) {
  if (!shows) return [];
  
  const query = String(options?.query ?? '').trim().toLowerCase();
  const genre = options?.genre?.trim() || null;
  const minRating = options?.minRating == null || Number(options.minRating) === 0
      ? null : Number(options.minRating);

  return shows.filter((show) => {
    const matchesQuery = !query || show.name?.toLowerCase().includes(query);

    const matchesGenre = !genre || show.genres?.includes(genre);

    const ratingValue = typeof show.rating === 'object' ? show.rating?.average : show.rating;

    const matchesRating = minRating === null || (ratingValue != null && Number(ratingValue) >= minRating);

    return matchesQuery && matchesGenre && matchesRating;
  });
}
