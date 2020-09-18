import {CATEGORIES} from "../const";

export const filter = {
  [CATEGORIES.ALL]: (films) => films,
  [CATEGORIES.WATCHLIST]: (films) => films.filter((film) => film.isInWatchlist),
  [CATEGORIES.HISTORY]: (films) => films.filter((film) => film.isInHistory),
  [CATEGORIES.FAVORITES]: (films) => films.filter((film) => film.isInFavorites)
};
