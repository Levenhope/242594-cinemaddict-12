import moment from "moment";
import AbstractView from "./abstract.js";
import {renderTemplate, removeInnerElements} from "../utils/render.js";
import {Lang} from "../lang.js";

export default class FilmView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._clickableElements = this.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`);
    this._favoriteButton = null;
    this._historyButton = null;
    this._watchlistButton = null;

    this._innerElementsClickHandler = this._innerElementsClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
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

  _innerElementsClickHandler(e) {
    e.preventDefault();
    this._callback.innerElements();
  }

  _favoriteClickHandler() {
    this._callback.favorites();
  }

  _historyClickHandler() {
    this._callback.history();
  }

  _watchlistClickHandler() {
    this._callback.watchlist();
  }

  setInnerElementsClickHandler(callback) {
    this._callback.innerElements = callback;
    this._clickableElements.forEach((clickableElement) => {
      clickableElement.addEventListener(`click`, this._innerElementsClickHandler);
    });
  }

  setFavoriteClickHandler(callback) {
    this._callback.favorites = callback;
    this._favoriteButton = this.getElement().querySelector(`.film-card__controls-item--favorite`);
    this._favoriteButton.addEventListener(`click`, this._favoriteClickHandler);
  }

  setHistoryClickHandler(callback) {
    this._callback.history = callback;
    this._historyButton = this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`);
    this._historyButton.addEventListener(`click`, this._historyClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlist = callback;
    this._watchlistButton = this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`);
    this._watchlistButton.addEventListener(`click`, this._watchlistClickHandler);
  }

  _restoreHandlers() {
    this.setWatchlistClickHandler(this._callback.innerElements);
    this.setFavoriteClickHandler(this._callback.favorites);
    this.setHistoryClickHandler(this._callback.history);
    this.setWatchlistClickHandler(this._callback.watchlist);
  }

  removeEventHandlers() {
    this._clickableElements.forEach((clickableElement) => {
      clickableElement.removeEventListener(`click`, this._innerElementsClickHandler);
    });
    this._favoriteButton.addEventListener(`click`, this._favoriteClickHandler);
    this._historyButton.addEventListener(`click`, this._historyClickHandler);
    this._watchlistButton.addEventListener(`click`, this._watchlistClickHandler);
  }

  updateControlsSection(...userFilmProperties) {
    const controlsSection = this.getElement().querySelector(`.film-card__controls`);
    this.removeEventHandlers();
    removeInnerElements(controlsSection);
    renderTemplate(controlsSection, this._getControlsTemplate(...userFilmProperties));
    this._restoreHandlers();
  }
}
