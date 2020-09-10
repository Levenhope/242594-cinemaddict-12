import NavigationView from "../view/navigation.js";
import {render, replace} from "../utils/render";
import {LANG} from "../lang.js";

export default class NavigationPresenter {
  constructor(films) {
    this._films = films;
    this._filmsNavigationMap = this._createNavigationMap();
    this._navigationList = this._generateNavigation(this._films, this._filmsNavigationMap);
    this._navigationComponent = new NavigationView(this._navigationList);
    this._updatedNavigationComponent = null;
  }

  init(parent) {
    render(parent, this._navigationComponent);
  }

  update() {
    this._filmsNavigationMap = this._createNavigationMap();
    this._navigationList = this._generateNavigation(this._films, this._filmsNavigationMap);
    this._updatedNavigationComponent = new NavigationView(this._navigationList);
    replace(this._updatedNavigationComponent, this._navigationComponent);
    this._navigationComponent = this._updatedNavigationComponent;
  }

  _createNavigationMap() {
    const navigationMap = {
      all: {
        itemTitle: LANG.ALL_MOVIES,
        countEntries(films) {
          return films.filter((film) => film).length;
        }
      },
      watchlist: {
        itemTitle: LANG.WATCHLIST_CAP,
          countEntries(films) {
          return films.filter((film) => film.isInWatchlist).length;
        }
      },
      history: {
        itemTitle: LANG.HISTORY_CAP,
          countEntries(films) {
          return films.filter((film) => film.isInHistory).length;
        }
      },
      favorites: {
        itemTitle: LANG.FAVORITES_CAP,
          countEntries(films) {
          return films.filter((film) => film.isInFavorites).length;
        }
      }
    };
    return navigationMap;
  }

  _generateNavigation(films, filmsMap) {
    return Object.entries(filmsMap).map(([id, params]) => {
      return {
        id,
        title: params.itemTitle,
        number: params.countEntries(films),
      };
    });
  };
}