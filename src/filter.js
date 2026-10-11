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
  if (!options) return shows;

  const genre = options.genre;
  const minRating = options.minRating != null ? Number(options.minRating) : null;
  const searchQuery = options.query ? String(options.query).toLowerCase().trim() : null;

  return shows.filter((show) => {
    const matchesGenre = genre == null || show.genres?.includes(genre);

    const ratingValue = typeof show.rating === 'object' ? show.rating?.average : show.rating;
    const numericRating = ratingValue != null ? Number(ratingValue) : 0;
    const matchesRating = minRating == null || numericRating >= minRating;

    const matchesQuery = !searchQuery || show.name?.toLowerCase().includes(searchQuery);

    return matchesGenre && matchesRating && matchesQuery;
  });
}
