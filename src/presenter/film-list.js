import FilmPresenter from "./film.js";
import FilmListView from "../view/list.js";
import MoreButtonView from "../view/more-button.js";
import EmptyListView from "../view/empty-list.js";
import LoadingView from "../view/loading.js";
import SortView from "../view/sort.js";
import {render, remove} from "../utils/render.js";
import {FILMS_NUMBER_PER_STEP, UPDATE_TYPE, SORT_TYPE} from "../const.js";
import {LANG} from "../lang.js";
import {filter} from "../utils/filter.js";
import {sortDate, sortRating} from "../utils/sort.js";

export default class FilmListPresenter {
  constructor(siteMainElement, filmListContainer, filmsModel, navigationModel, api) {
    this._siteMainElement = siteMainElement;
    this._filmListContainer = filmListContainer;
    this._filmsModel = filmsModel;
    this._navigationModel = navigationModel;
    this._api = api;

    this._renderedFilmsCount = FILMS_NUMBER_PER_STEP;
    this._currentSortType = SORT_TYPE.DEFAULT;
    this._mainFilmListComponent = new FilmListView(false, LANG.ALL_MOVIES_TITLE);
    this._moreButtonComponent = new MoreButtonView();
    this._emptyListComponent = new EmptyListView();
    this._loadingComponent = new LoadingView();
    this._sortComponent = new SortView();

    this._filmPresenter = {};
    this._isLoading = true;
    this._defaultFilmList = null;

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleEscKeyDownEvent = this._handleEscKeyDownEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._renderSort();
    render(this._filmListContainer, this._mainFilmListComponent);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._navigationModel.addObserver(this._handleModelEvent);

    this._renderFilmList();

    document.addEventListener(`keydown`, this._handleEscKeyDownEvent);
  }

  destroy() {
    this._clearBoard({resetRenderedFilmsCount: true, resetSortType: true});

    remove(this._mainFilmListComponent);
    remove(this._moreButtonComponent);

    this._filmsModel.removeObserver(this._handleModelEvent);
    this._navigationModel.removeObserver(this._handleModelEvent);

    document.removeEventListener(`keydown`, this._handleEscKeyDownEvent);
  }

  _getFilms() {
    const categoryName = this._navigationModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = filter[categoryName](films);

    if (this._defaultFilmList === null) {
      this._defaultFilmList = filteredFilms;
    }

    switch (this._currentSortType) {
      case SORT_TYPE.DATE:
        return filteredFilms.sort(sortDate);
      case SORT_TYPE.RATING:
        return filteredFilms.sort(sortRating);
      case SORT_TYPE.DEFAULT:
        return filter[categoryName](this._defaultFilmList)
    }
  }

  _renderFilm(boardFilm, parent) {
    const filmPresenter = new FilmPresenter(boardFilm, parent, this._handleModeChange, this._handleModelEvent, this._api);
    filmPresenter.init();

    this._filmPresenter[boardFilm.id] = filmPresenter;
  }

  _renderFilms(films, parent) {
    films.slice().forEach((boardFilm) => this._renderFilm(boardFilm, parent));
  }

  _renderSort() {
    render(this._siteMainElement, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderMoreButton() {
    render(this._mainFilmListComponent, this._moreButtonComponent);

    this._moreButtonComponent.setClickHandler(() => {
      const filmsCount = this._getFilms().length;
      const newRenderedFilmsCount = Math.min(filmsCount, this._renderedFilmsCount + FILMS_NUMBER_PER_STEP);
      const films = this._getFilms().slice(this._renderedFilmsCount, newRenderedFilmsCount);

      this._renderFilms(films, this._mainFilmListComponent);
      this._renderedFilmsCount = newRenderedFilmsCount;

      if (this._renderedFilmsCount >= filmsCount) {
        remove(this._moreButtonComponent);
      }
    });
  }

  _renderEmptyList() {
    render(this._filmListContainer, this._emptyListComponent);
  }

  _renderLoading() {
    render(this._filmListContainer, this._loadingComponent);
  }

  _renderFilmList() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const films = this._getFilms();
    const filmsCount = films.length;

    this._sortComponent.updateSortView(this._currentSortType);

    if (filmsCount < 1) {
      this._renderEmptyList();
    } else {
      this._renderFilms(films.slice(0, Math.min(filmsCount, this._renderedFilmsCount)), this._mainFilmListComponent);

      if (filmsCount > this._renderedFilmsCount) {
        this._renderMoreButton();
      }
    }
  }

  _clearBoard({resetRenderedFilmsCount = false, resetSortType = false} = {}) {
    Object.values(this._filmPresenter).forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._moreButtonComponent);
    remove(this._emptyListComponent);
    remove(this._loadingComponent);

    if (resetRenderedFilmsCount) {
      this._renderedFilmsCount = FILMS_NUMBER_PER_STEP;
    }

    if (resetSortType) {
      this._currentSortType = SORT_TYPE.DEFAULT;
    }
  }

  _handleModeChange() {
    Object.values(this._filmPresenter).forEach((presenter) => presenter.hideModal());
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UPDATE_TYPE.INIT:
        this._isLoading = false;
        this._clearBoard();
        this._renderFilmList();
        this._navigationModel.updateCounters();
        break;
      case UPDATE_TYPE.MINOR:
        this._clearBoard();
        this._renderFilmList();
        this._navigationModel.updateCounters();
        break;
      case UPDATE_TYPE.MAJOR:
        this._clearBoard({resetRenderedFilmsCount: true, resetSortType: true});
        this._renderFilmList();
        break;
    }
  }

  _handleEscKeyDownEvent(e) {
    if (e.key === `Escape` || e.key === `Esc`) {
      e.preventDefault();
      this._handleModeChange();
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._sortComponent.updateSortView(sortType);
    this._clearBoard();
    this._renderFilmList();
  }
}
