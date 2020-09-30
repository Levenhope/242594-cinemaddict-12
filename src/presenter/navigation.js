import NavigationView from "../view/navigation.js";
import {render, replace, remove} from "../utils/render.js";
import {UpdateType, RenderPosition} from "../const.js";

export default class NavigationPresenter {
  constructor(parent, navigationModel, filmsModel, handleNavigationEvent) {
    this._navigationModel = navigationModel;
    this._filmsModel = filmsModel;
    this._parent = parent;
    this._navigationComponent = null;
    this._currentFilter = null;
    this._handleNavigationEvent = handleNavigationEvent;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleStatisticButtonClick = this._handleStatisticButtonClick.bind(this);

    this._navigationModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._navigationModel.getFilter();
    const prevNavigationComponent = this._navigationComponent;

    const filmsNavigationMap = this._navigationModel.getCounters();
    const navigationList = this._generateNavigation(this._filmsModel.getFilms(), filmsNavigationMap);

    this._navigationComponent = new NavigationView(navigationList, this._currentFilter);
    this._navigationComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._navigationComponent.setStatisticButtonClickHandler(this._handleStatisticButtonClick);

    if (prevNavigationComponent === null) {
      render(this._parent, this._navigationComponent, RenderPosition.AFTER_BEGIN);
    } else {
      replace(this._navigationComponent, prevNavigationComponent);
      prevNavigationComponent.removeEventHandlers();
      remove(prevNavigationComponent);
    }
  }

  _generateNavigation(films, filmsNavigationMap) {
    return Object.entries(filmsNavigationMap).map(([id, navigationItemParams]) => {
      return {
        id,
        title: navigationItemParams.itemTitle,
        number: navigationItemParams.countEntries(films),
      };
    });
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filter) {
    if (this._currentFilter === filter) {
      return;
    }

    this._handleNavigationEvent(filter);
    this._navigationModel.setFilter(UpdateType.MAJOR, filter);
  }

  _handleStatisticButtonClick(statistic) {
    this._currentFilter = null;
    this._handleNavigationEvent(statistic);
  }
}
