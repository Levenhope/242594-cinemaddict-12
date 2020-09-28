import moment from "moment";
import AbstractView from "./abstract.js";
import {renderTemplate, removeInnerElements} from "../utils/render.js";
import {Lang} from "../lang.js";

export default class FilmView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._callback = {};
  }

  getTemplate() {
    const {id, poster, title, rating, date, duration, genres, description, comments, isInWatchlist, isInFavorites, isInHistory} = this._film;
    return (
      `<article class="film-card" id="${id}">
        <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${moment(date).format(`YYYY`)}</span>
            <span class="film-card__duration">
              ${moment.duration(duration, `m`).hours()}${Lang.HOURS_SHORT}
              ${moment.duration(duration, `m`).minutes()}${Lang.MINUTES_SHORT}
            </span>
            <span class="film-card__genre">${genres.length > 0 ? genres[0] : ``}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description.length > 140 ? description.substring(0, 140) + `...` : description}</p>
          <a class="film-card__comments">${comments.length} ${Lang.COMMENTS}</a>
          <div class="film-card__controls">
            ${this._getControlsTemplate(isInWatchlist, isInHistory, isInFavorites)}
          </div>
      </article>`
    );
  }

  _getControlsTemplate(isInWatchlist, isInHistory, isInFavorites) {
    return (
      `<button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isInWatchlist ? `film-card__controls-item--active` : ``}">${Lang.ADD_TO_WATCHLIST}</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isInHistory ? `film-card__controls-item--active` : ``}">${Lang.ALREADY_WATCHED}</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${isInFavorites ? `film-card__controls-item--active` : ``}">${Lang.ADD_TO_FAVORITES}</button>`
    );
  }

  _restoreHandlers() {
    this.setFavoriteClickHandler(this._callback.favorites);
    this.setHistoryClickHandler(this._callback.history);
    this.setWatchlistClickHandler(this._callback.watchlist);
  }

  updateControlsSection(...userFilmProperties) {
    const controlsSection = this.getElement().querySelector(`.film-card__controls`);
    removeInnerElements(controlsSection);
    renderTemplate(controlsSection, this._getControlsTemplate(...userFilmProperties));
    this._restoreHandlers();
  }

  setInnerElementsClickHandler(callback) {
    this.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`).forEach((clickableElement) => {
      clickableElement.addEventListener(`click`, function (e) {
        e.preventDefault();
        callback();
      });
    });
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
