import FilmListView from "../view/list.js";
import FilmView from "../view/film.js";
import MoreButtonView from "../view/more-button.js";
import EmptyListView from "../view/empty-list.js";
import {render, remove, replace} from "../utils/render.js";
import {FILMS_NUMBER_MAIN, FILMS_NUMBER_PER_STEP} from "../const.js";
import {LANG} from "../lang.js";
import FilmPresenter from "./film.js";
import BoardPresenter from "../../../242594-taskmanager-12/src/presenter/board";
import MainMenuView from "../../../242594-taskmanager-12/src/view/main-menu";
import FilterView from "../../../242594-taskmanager-12/src/view/filter";

export default class FilmListPresenter {
  constructor(filmListContainer) {
    this._filmListContainer = filmListContainer;
    this._listedFilms = null;

    this._renderedFilmsCount = FILMS_NUMBER_PER_STEP;
    this._mainFilmListComponent = new FilmListView(false, LANG.ALL_MOVIES_TITLE);
    this._topFilmListComponent = new FilmListView(true, LANG.TOP_RATED_TITLE);
    this._commentedFilmListComponent = new FilmListView(true, LANG.MOST_COMMENTED);
    this._moreButtonComponent = new MoreButtonView();
    this._emptyListComponent = new EmptyListView();
  }

  init(listedFilms) {
    this._listedFilms = listedFilms.slice();

    render(this._filmListContainer, this._mainFilmListComponent);
    render(this._filmListContainer, this._topFilmListComponent);
    render(this._filmListContainer, this._commentedFilmListComponent);

    this._renderFilmList();
  }

  _renderFilm(parent, boardFilm) {
    const filmPresenter = new FilmPresenter(parent, boardFilm);
    filmPresenter.init();
  }

  _renderFilms(parent, from = 0, to = 2) {
    this._listedFilms.slice(from, to).forEach((boardFilm) => this._renderFilm(parent, boardFilm));
  }

  _renderMoreButton() {
    render(this._mainFilmListComponent, this._moreButtonComponent);

    this._moreButtonComponent.setClickHandler(() => {
      this._listedFilms
        .slice(this._renderedFilmsCount, this._renderedFilmsCount + FILMS_NUMBER_PER_STEP)
        .forEach((film) => render(this._mainFilmListComponent.getElement().querySelector(`.films-list__container`), new FilmView(film)));

      this._renderedFilmsCount += FILMS_NUMBER_PER_STEP;

      if (this._renderedFilmsCount >= this._listedFilms.length) {
        remove(this._moreButtonComponent);
      }
    });
  }

  _renderEmptyList() {
    render(this._filmListContainer, this._emptyListComponent);
  }

  _renderFilmList() {
    if (FILMS_NUMBER_MAIN < 1) {
      this._renderEmptyList();
    } else {
      this._renderFilms(this._mainFilmListComponent, 0, Math.min(this._listedFilms.length, FILMS_NUMBER_PER_STEP));

      if (this._listedFilms.length > FILMS_NUMBER_PER_STEP) {
        this._renderMoreButton();
      }

      this._renderFilms(this._topFilmListComponent);
      this._renderFilms(this._commentedFilmListComponent);
    }
  }
}
