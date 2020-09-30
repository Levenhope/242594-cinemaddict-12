import FilmPresenter from "./film.js";
import FilmListView from "../view/film-list.js";
import MoreButtonView from "../view/more-button.js";
import EmptyListView from "../view/empty-list.js";
import LoadingView from "../view/loading.js";
import SortView from "../view/sort.js";
import FilmListsContainerView from "../view/film-lists-container.js";
import {FILMS_NUMBER_PER_STEP, UpdateType, SortType} from "../const.js";
import {render, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {sortByDate, sortByRating} from "../utils/sort.js";
import {Lang} from "../lang.js";
import {ScreenMode} from "../const";

export default class FilmListPresenter {
  constructor(parent, filmsModel, navigationModel, api, profileComponent) {
    this._parent = parent;
    this._filmsModel = filmsModel;
    this._navigationModel = navigationModel;
    this._api = api;
    this._profileComponent = profileComponent;

    this._renderedFilmsCount = FILMS_NUMBER_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._mainFilmListComponent = new FilmListView(false, Lang.ALL_MOVIES_TITLE);
    this._moreButtonComponent = new MoreButtonView();
    this._emptyListComponent = new EmptyListView();
    this._loadingComponent = new LoadingView();
    this._filmsContainerComponent = new FilmListsContainerView();
    this._sortComponent = null;

    this._filmPresenter = {};
    this._isLoading = true;
    this._defaultFilmList = null;

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._renderSort();
    render(this._parent, this._filmsContainerComponent);
    render(this._filmsContainerComponent, this._mainFilmListComponent);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._navigationModel.addObserver(this._handleModelEvent);

    this._renderFilmList();
  }

  destroy() {
    this._clearBoard({resetRenderedFilmsCount: true, resetSortType: true});

    this._moreButtonComponent.removeEventHandler();
    this._sortComponent.removeEventHandlers();

    remove(this._mainFilmListComponent);
    remove(this._moreButtonComponent);
    remove(this._sortComponent);
    remove(this._filmsContainerComponent);

    this._filmsModel.removeObserver(this._handleModelEvent);
    this._navigationModel.removeObserver(this._handleModelEvent);
  }

  _getFilms() {
    const categoryName = this._navigationModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = filter[categoryName](films);

    this._profileComponent.printRankTitle(films);

    if (this._defaultFilmList === null) {
      this._defaultFilmList = films;
    }

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredFilms.slice().sort(sortByDate);
      case SortType.RATING:
        return filteredFilms.slice().sort(sortByRating);
      case SortType.DEFAULT:
        return filter[categoryName](this._defaultFilmList);
    }

    return filteredFilms;
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
    this._sortComponent = new SortView();
    render(this._parent, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderMoreButton() {
    render(this._mainFilmListComponent, this._moreButtonComponent);

    this._moreButtonComponent.setMoreButtonClickHandler(() => {
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
    render(this._filmsContainerComponent, this._emptyListComponent);
  }

  _renderLoading() {
    render(this._filmsContainerComponent, this._loadingComponent);
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
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _handleModeChange() {
    Object.values(this._filmPresenter).forEach((presenter) => {
      if (presenter.mode === ScreenMode.MODAL) {
        presenter.hideModal();
      }
    });
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.INIT:
        this._isLoading = false;
        this._clearBoard();
        this._renderFilmList();
        this._navigationModel.updateCounters();
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderFilmList();
        this._navigationModel.updateCounters();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedFilmsCount: true, resetSortType: true});
        this._renderFilmList();
        break;
      case UpdateType.SORT:
        this._clearBoard({resetRenderedFilmsCount: true});
        this._renderFilmList();
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._sortComponent.updateSortView(sortType);
    this._handleModelEvent(UpdateType.SORT);
  }
}
