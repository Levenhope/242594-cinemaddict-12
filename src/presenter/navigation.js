import NavigationView from "../view/navigation.js";
import {render, replace, remove} from "../utils/render.js";
import {LANG} from "../lang.js";
import {CATEGORIES, UPDATE_TYPE} from "../const.js";

export default class NavigationPresenter {
  constructor(parent, navigationModel, filmsModel) {
    this._navigationModel = navigationModel;
    this._filmsModel = filmsModel;
    this._parent = parent;
    this._navigationComponent = null;
    this._currentFilter = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._navigationModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._navigationModel.getFilter();
    const prevNavigationComponent = this._navigationComponent;

    const filmsNavigationMap = this._navigationModel.getCounters();
    const navigationList = this._generateNavigation(this._filmsModel.getItems(), filmsNavigationMap);

    this._navigationComponent = new NavigationView(navigationList, this._currentFilter);
    this._navigationComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevNavigationComponent === null) {
      render(this._parent, this._navigationComponent);
      return;
    }

    replace(this._navigationComponent, prevNavigationComponent);
    remove(prevNavigationComponent);
  }

  _handleModelEvent() {
    console.log('handle model nav');
    this.init();
  }


  _handleFilterTypeChange(filter) {
    if (this._currentFilter === filter) {
      return;
    }

    this._navigationModel.setFilter(UPDATE_TYPE.MAJOR, filter);
  }

  _generateNavigation(films, filmsMap) {
    return Object.entries(filmsMap).map(([id, params]) => {
      return {
        id,
        title: params.itemTitle,
        number: params.countEntries(films),
      };
    });
  }
}
