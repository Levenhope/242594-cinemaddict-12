import FilmPresenter from "./film.js";
import FilmListView from "../view/list.js";
import MoreButtonView from "../view/more-button.js";
import EmptyListView from "../view/empty-list.js";
import {render, remove} from "../utils/render.js";
import {FILMS_NUMBER_MAIN, FILMS_NUMBER_PER_STEP, UPDATE_TYPE} from "../const.js";
import {LANG} from "../lang.js";

export default class FilmListPresenter {
  constructor(filmListContainer, filmsModel) {
    this._filmListContainer = filmListContainer;
    this._filmsModel = filmsModel;

    this._renderedFilmsCount = FILMS_NUMBER_PER_STEP;
    this._mainFilmListComponent = new FilmListView(false, LANG.ALL_MOVIES_TITLE);
    this._topFilmListComponent = new FilmListView(true, LANG.TOP_RATED_TITLE);
    this._commentedFilmListComponent = new FilmListView(true, LANG.MOST_COMMENTED);
    this._moreButtonComponent = new MoreButtonView();
    this._emptyListComponent = new EmptyListView();
    this._filmPresenter = {};

    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init() {
    render(this._filmListContainer, this._mainFilmListComponent);
    render(this._filmListContainer, this._topFilmListComponent);
    render(this._filmListContainer, this._commentedFilmListComponent);

    this._filmsModel.addObserver(this._handleModelEvent);

    this._renderFilmList();
  }

  _handleModeChange() {
    Object.values(this._filmPresenter).forEach((presenter) => presenter.hideModal());
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
      this._filmsModel.getItems()
        .slice(this._renderedFilmsCount, this._renderedFilmsCount + FILMS_NUMBER_PER_STEP)
        .forEach((film) => this._renderFilm(film, this._mainFilmListComponent));

      this._renderedFilmsCount += FILMS_NUMBER_PER_STEP;

      if (this._renderedFilmsCount >= this._filmsModel.getItems().length) {
        remove(this._moreButtonComponent);
      }
    });
  }

  _renderEmptyList() {
    render(this._filmListContainer, this._emptyListComponent);
  }

  _renderFilmList() {
    const films = this._filmsModel.getItems();
    const filmsCount = films.length;

    if (FILMS_NUMBER_MAIN < 1) {
      this._renderEmptyList();
    } else {
      this._renderFilms(films.slice(0, Math.min(filmsCount, this._renderedFilmsCount)), this._mainFilmListComponent);


      if (films.length > FILMS_NUMBER_PER_STEP) {
        this._renderMoreButton();
      }

      this._renderFilms(films.slice(0, 2), this._topFilmListComponent);
      this._renderFilms(films.slice(0, 2), this._commentedFilmListComponent);
    }
  }

  _handleModelEvent(updateType) {
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
