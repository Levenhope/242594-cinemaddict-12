import moment from "moment";
import AbstractView from "./abstract.js";
import {Lang} from "../lang.js";

export default class DetailModalView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._closeButton = this.getElement().querySelector(`.film-details__close-btn`);
    this._watchlistToggle = this.getElement().querySelector(`input#watchlist`);
    this._historyToggle = this.getElement().querySelector(`input#watched`);
    this._favoriteToggle = this.getElement().querySelector(`input#favorite`);

    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this.updateControlsSection = this.updateControlsSection.bind(this);
  }

  getTemplate() {
    const {poster, title, originalTitle, rating, date, duration, genres, description, director, writers, actors, country, age, isInWatchlist, isInHistory, isInFavorites} = this._film;
    return (
      `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">${Lang.CLOSE}</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="${poster}" alt="${title}">
                <p class="film-details__age">${age}+</p>
              </div>
              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${title}</h3>
                    <p class="film-details__title-original">${Lang.ORIGINAL_TITLE}: ${originalTitle}</p>
                  </div>
                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${rating}</p>
                  </div>
                </div>
                <table class="film-details__table">
                  <tr class="film-details__row">
                    <td class="film-details__term">${Lang.DIRECTOR}</td>
                    <td class="film-details__cell">${director}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">${Lang.WRITERS}</td>
                    <td class="film-details__cell">${writers.join(`, `)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">${Lang.ACTORS}</td>
                    <td class="film-details__cell">${actors.join(`, `)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">${Lang.RELEASE_DATE}</td>
                    <td class="film-details__cell">${moment(date).format(`d MMMM YYYY`)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">${Lang.RUNTIME}</td>
                    <td class="film-details__cell">
                        ${moment.duration(duration, `m`).hours()}${Lang.HOURS_SHORT}
                        ${moment.duration(duration, `m`).minutes()}${Lang.MINUTES_SHORT}
                    </td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">${Lang.COUNTRY}</td>
                    <td class="film-details__cell">${country}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">${genres.length < 2 ? Lang.GENRE : Lang.GENRES}</td>
                    <td class="film-details__cell">
                      ${genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``)}
                    </td>
                  </tr>
                </table>
                <p class="film-details__film-description">
                 ${description} 
                </p>
              </div>
            </div>
            <section class="film-details__controls">
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isInWatchlist ? `checked` : ``}>
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">${Lang.ADD_TO_WATCHLIST}</label>
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isInHistory ? `checked` : ``}>
              <label for="watched" class="film-details__control-label film-details__control-label--watched">${Lang.ALREADY_WATCHED}</label>
              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isInFavorites ? `checked` : ``}>
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite">${Lang.ADD_TO_FAVORITES}</label>
            </section>
          </div>
          <div class="form-details__bottom-container">
          </div>
        </form>
      </section>`
    );
  }

  updateControlsSection(isInWatchlist, isInHistory, isInFavorites) {
    this._watchlistToggle.checked = isInWatchlist;
    this._watchlistToggle.disabled = false;

    this._historyToggle.checked = isInHistory;
    this._historyToggle.disabled = false;

    this._favoriteToggle.checked = isInFavorites;
    this._favoriteToggle.disabled = false;
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favorites();
    this._favoriteToggle.disabled = true;
  }

  _historyClickHandler(evt) {
    evt.preventDefault();
    this._callback.history();
    this._historyToggle.disabled = true;
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlist();
    this._watchlistToggle.disabled = true;
  }

  _closeButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeButton();
  }

  setCloseButtonClickHandler(callback) {
    this._callback.closeButton = callback;
    this._closeButton.addEventListener(`click`, this._closeButtonClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favorites = callback;
    this._favoriteToggle.addEventListener(`click`, this._favoriteClickHandler);
  }

  setHistoryClickHandler(callback) {
    this._callback.history = callback;
    this._historyToggle.addEventListener(`click`, this._historyClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlist = callback;
    this._watchlistToggle.addEventListener(`click`, this._watchlistClickHandler);
  }

  removeEventHandlers() {
    this._closeButton.removeEventListener(`click`, this._closeButtonClickHandler);
    this._favoriteToggle.removeEventListener(`click`, this._favoriteClickHandler);
    this._historyToggle.removeEventListener(`click`, this._historyClickHandler);
    this._watchlistToggle.removeEventListener(`click`, this._watchlistClickHandler);
  }
}
