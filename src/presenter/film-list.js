import FilmListsContainerView from "../view/lists-container.js";
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
    this._filmListComponent = new FilmListView(false, LANG.ALL_MOVIES_TITLE, `allfilms`);
    this._moreButtonComponent = new MoreButtonView();
    this._emptyListComponent = new EmptyListView();
  }

  init(listedFilms) {
    this._listedFilms = listedFilms.slice();

    render(this._filmListContainer, this._filmListComponent);

    this._renderFilmList();
  }

  _renderFilm(film) {
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

    render(this._filmListComponent.getElement().querySelector(`#allfilms`), cardComponent);
  }

  _renderFilms(from, to) {
    this._listedFilms.slice(from, to).forEach((boardFilm) => this._renderFilm(boardFilm));
  }

  _renderMoreButton() {
    render(this._filmListComponent, this._moreButtonComponent);

    this._moreButtonComponent.setClickHandler(() => {
      this._listedFilms
        .slice(this._renderedFilmsCount, this._renderedFilmsCount + FILMS_NUMBER_PER_STEP)
        .forEach((film) => render(this._filmListComponent.getElement().querySelector(`#allfilms`), new FilmView(film)));

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
      this._renderFilms(0, Math.min(this._listedFilms.length, FILMS_NUMBER_PER_STEP));

      if (this._listedFilms.length > FILMS_NUMBER_PER_STEP) {
        this._renderMoreButton();
      }
    }
  }
}
