import {Category} from "../const.js";

export const filter = {
  [Category.ALL]: (films) => films,
  [Category.WATCHLIST]: (films) => films.filter((film) => film.isInWatchlist),
  [Category.HISTORY]: (films) => films.filter((film) => film.isInHistory),
  [Category.FAVORITES]: (films) => films.filter((film) => film.isInFavorites)
};
