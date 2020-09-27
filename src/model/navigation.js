import Observer from "../utils/observer.js";
import {Category, UpdateType} from "../const.js";
import {Lang} from "../lang.js";

export default class NavigationModel extends Observer {
  constructor() {
    super();
    this._activeCategory = Category.ALL;
  }

  setFilter(updateType, category) {
    this._activeCategory = category;
    this._notify(updateType, category);
  }

  getCounters() {
    const navigationMap = {
      [Category.ALL]: {
        itemTitle: Lang.ALL_MOVIES,
        countEntries(films) {
          return films.length;
        }
      },
      [Category.WATCHLIST]: {
        itemTitle: Lang.WATCHLIST,
        countEntries(films) {
          return films.filter((film) => film.isInWatchlist).length;
        }
      },
      [Category.HISTORY]: {
        itemTitle: Lang.HISTORY,
        countEntries(films) {
          return films.filter((film) => film.isInHistory).length;
        }
      },
      [Category.FAVORITES]: {
        itemTitle: Lang.FAVORITES,
        countEntries(films) {
          return films.filter((film) => film.isInFavorites).length;
        }
      }
    };

    return navigationMap;
  }

  getFilter() {
    return this._activeCategory;
  }

  updateCounters() {
    this._notify(UpdateType.NAVIGATION);
  }
}
