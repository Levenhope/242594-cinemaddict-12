import Observer from "../utils/observer.js";
import {CATEGORIES} from "../const.js";
import {LANG} from "../lang";
import {UPDATE_TYPE} from "../const";

export default class NavigationModel extends Observer {
  constructor() {
    super();
    this._activeCategory = CATEGORIES.ALL;
  }

  getCounters() {
    const navigationMap = {
      [CATEGORIES.ALL]: {
        itemTitle: LANG.ALL_MOVIES,
        countEntries(films) {
          return films.length;
        }
      },
      [CATEGORIES.WATCHLIST]: {
        itemTitle: LANG.WATCHLIST_CAP,
        countEntries(films) {
          return films.filter((film) => film.isInWatchlist).length;
        }
      },
      [CATEGORIES.HISTORY]: {
        itemTitle: LANG.HISTORY_CAP,
        countEntries(films) {
          return films.filter((film) => film.isInHistory).length;
        }
      },
      [CATEGORIES.FAVORITES]: {
        itemTitle: LANG.FAVORITES_CAP,
        countEntries(films) {
          return films.filter((film) => film.isInFavorites).length;
        }
      }
    };

    return navigationMap;
  }

  setFilter(updateType, category) {
    this._activeCategory = category;
    this._notify(updateType, category);
  }

  getFilter() {
    return this._activeCategory;
  }

  updateCounters() {
    this._notify(UPDATE_TYPE.NAVIGATION);
  }
}
