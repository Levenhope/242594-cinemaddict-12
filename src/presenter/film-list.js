import FilmPresenter from "./film.js";
import FilmListView from "../view/list.js";
import MoreButtonView from "../view/more-button.js";
import EmptyListView from "../view/empty-list.js";
import {render, remove} from "../utils/render.js";
import {FILMS_NUMBER_PER_STEP, UPDATE_TYPE} from "../const.js";
import {LANG} from "../lang.js";
import {filter} from "../utils/filter.js";

export default class FilmListPresenter {
  constructor(filmListContainer, filmsModel, navigationModel) {
    this._filmListContainer = filmListContainer;
    this._filmsModel = filmsModel;
    this._navigationModel = navigationModel;

    this._renderedFilmsCount = FILMS_NUMBER_PER_STEP;
    this._mainFilmListComponent = new FilmListView(false, LANG.ALL_MOVIES_TITLE);
    this._moreButtonComponent = new MoreButtonView();
    this._emptyListComponent = new EmptyListView();
    this._filmPresenter = {};

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {
    render(this._filmListContainer, this._mainFilmListComponent);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._navigationModel.addObserver(this._handleModelEvent);

    this._renderFilmList();
  }

  _renderFilm(boardFilm, parent) {
    const filmPresenter = new FilmPresenter(boardFilm, parent, this._handleModeChange);
    filmPresenter.init();

    this._filmPresenter[boardFilm.id] = filmPresenter;
  }

  _renderFilms(films, parent) {
    films.slice().forEach((boardFilm) => this._renderFilm(boardFilm, parent));
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

  _renderFilmList() {
    const films = this._getFilms();
    const filmsCount = films.length;

    if (filmsCount < 1) {
      this._renderEmptyList();
    } else {
      this._renderFilms(films.slice(0, Math.min(filmsCount, this._renderedFilmsCount)), this._mainFilmListComponent);


      if (filmsCount > FILMS_NUMBER_PER_STEP) {
        this._renderMoreButton();
      }
    }
  }

  _getFilms() {
    const categoryName = this._navigationModel.getFilter();
    const films = this._filmsModel.getItems();
    const filteredFilms = filter[categoryName](films);

    return filteredFilms;
  }

  _handleModeChange() {
    Object.values(this._filmPresenter).forEach((presenter) => presenter.hideModal());
  }

  _handleModelEvent(updateType) {
    console.log(updateType);
    switch (updateType) {
      case UPDATE_TYPE.MINOR:
        this._clearBoard();
        this._renderFilmList();
        break;
      case UPDATE_TYPE.MAJOR:
        this._clearBoard({resetRenderedFilmsCount: true});
        this._renderFilmList();
        break;
    }
  }

  _clearBoard({resetRenderedFilmsCount = false} = {}) {
    Object.values(this._filmPresenter).forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._moreButtonComponent);
    remove(this._emptyListComponent);

    if (resetRenderedFilmsCount) {
      this._renderedFilmsCount = FILMS_NUMBER_PER_STEP;
    }
  }
}
