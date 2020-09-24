import AbstractView from "./abstract.js";
import {LANG} from "../lang.js";
import {getReadableDuration} from "../utils/film.js";
import {RENDER_POSITION} from "../const.js";

export default class FilmView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._callback = {};
  }

  getControlsTemplate(isInWatchlist, isInHistory, isInFavorites) {
    return (
      `<button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isInWatchlist ? `film-card__controls-item--active` : ``}">${LANG.ADD} ${LANG.TO} ${LANG.WATCHLIST}</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isInHistory ? `film-card__controls-item--active` : ``}">${LANG.MARK} ${LANG.AS} ${LANG.WATCHED}</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${isInFavorites ? `film-card__controls-item--active` : ``}">${LANG.MARK} ${LANG.AS} ${LANG.FAVORITES}</button>`
    );
  }

  getTemplate() {
    const {id, poster, title, rating, date, duration, genres, description, comments, isInWatchlist, isInFavorites, isInHistory} = this._film;
    return (
      `<article class="film-card" id="${id}">
        <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${date.getFullYear()}</span>
            <span class="film-card__duration">${getReadableDuration(duration)}</span>
            <span class="film-card__genre">${genres.length > 0 ? genres[0] : ``}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description.length > 140 ? description.substring(0, 140) + `...` : description}</p>
          <a class="film-card__comments">${comments.length} ${LANG.COMMENTS}</a>
          <div class="film-card__controls">
            ${this.getControlsTemplate(isInWatchlist, isInHistory, isInFavorites)}
          </div>
      </article>`
    );
  }

  updateControlsSection(...properties) {
    this._controlsSection = this.getElement().querySelector(`.film-card__controls`);
    if (this._controlsSection) {
      this._controlsSection.innerHTML = ``;
      this._controlsSection.insertAdjacentHTML(RENDER_POSITION.BEFORE_END, this.getControlsTemplate(...properties));
    }
  }

  restoreHandlers() {
    this.setFavoriteClickHandler(this._callback.favorites);
    this.setHistoryClickHandler(this._callback.history);
    this.setWatchlistClickHandler(this._callback.watchlist);
  }

  setInnerElementsClickHandler(callback) {
    for (let clickable of this.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`)) {
      clickable.addEventListener(`click`, function (e) {
        e.preventDefault();
        callback();
      });
    }
  }

  setFavoriteClickHandler(callback) {
    this._callback.favorites = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, function () {
      callback();
    });
  }

  setHistoryClickHandler(callback) {
    this._callback.history = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, function () {
      callback();
    });
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlist = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, function () {
      callback();
    });
  }
}
