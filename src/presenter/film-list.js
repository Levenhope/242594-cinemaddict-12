import FilmListView from "../view/list.js";
import FilmView from "../view/film.js";
import MoreButtonView from "../view/more-button.js";
import DetailModalView from "../view/detail-modal.js";
import CommentItemView from "../view/comment.js";
import CommentsView from "../view/comments.js";
import EmptyListView from "../view/empty-list.js";
import {render, remove} from "../utils/render.js";
import {generateComment} from "../mock/comment";
import {FILMS_NUMBER_MAIN, FILMS_NUMBER_PER_STEP} from "../const.js";
import {LANG} from "../lang";

export default class FilmListPresenter {
  constructor(filmListContainer) {
    this._filmListContainer = filmListContainer;

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

  _renderFilm(parent, film) {
    const cardComponent = new FilmView(film);
    const detailModalComponent = new DetailModalView(film);
    const siteBodyElement = document.querySelector(`body`);
    const siteDetailModalBottomElement = detailModalComponent.getElement().querySelector(`.form-details__bottom-container`);

    render(siteDetailModalBottomElement, new CommentsView(film.commentsNumber));

    const siteDetailModalCommentsListElement = detailModalComponent.getElement().querySelector(`.film-details__comments-list`);

    const filmComments = new Array(film.commentsNumber).fill().map(generateComment);

    for (let i = 0; i < film.commentsNumber; i++) {
      render(siteDetailModalCommentsListElement, new CommentItemView(filmComments[i]));
    }

    cardComponent.setInnerElementsClickHandler(() => {
      siteBodyElement.appendChild(detailModalComponent.getElement());
    });

    detailModalComponent.setCloseButtonClickHandler(() => {
      siteBodyElement.removeChild(detailModalComponent.getElement());
    });

    render(parent.getElement().querySelector(`.films-list__container`), cardComponent);
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
