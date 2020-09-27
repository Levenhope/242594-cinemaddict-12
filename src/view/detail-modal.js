import AbstractView from "./abstract.js";
import {LANG} from "../lang.js";
import {RENDER_POSITION} from "../const.js";
import moment from "moment";

export default class DetailModalView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._controlsSection = null;
  }

  getControlsTemplate(isInWatchlist, isInHistory, isInFavorites) {
    return (
      `<input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isInWatchlist ? `checked` : ``}>
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">${isInWatchlist ? LANG.ALREADY + ` ` + LANG.IN : LANG.ADD + ` ` + LANG.TO} ${LANG.WATCHLIST}</label>
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isInHistory ? `checked` : ``}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">${isInHistory ? LANG.ALREADY : LANG.ADD + ` ` + LANG.TO} ${LANG.WATCHED}</label>
      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isInFavorites ? `checked` : ``}>
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">${isInFavorites ? LANG.ALREADY + ` ` + LANG.IN : LANG.ADD + ` ` + LANG.TO} ${LANG.FAVORITES}</label>`
    );
  }

  getTemplate() {
    const {poster, title, originalTitle, rating, date, duration, genres, description, director, writers, actors, country, age, isInWatchlist, isInHistory, isInFavorites} = this._film;
    return (
      `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">${LANG.CLOSE}</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="${poster}" alt="">
                <p class="film-details__age">${age}+</p>
              </div>
              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${title}</h3>
                    <p class="film-details__title-original">${LANG.ORIGINAL_TITLE}: ${originalTitle}</p>
                  </div>
                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${rating}</p>
                  </div>
                </div>
                <table class="film-details__table">
                  <tr class="film-details__row">
                    <td class="film-details__term">${LANG.DIRECTOR}</td>
                    <td class="film-details__cell">${director}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">${LANG.WRITERS}</td>
                    <td class="film-details__cell">${writers.join(`, `)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">${LANG.ACTORS}</td>
                    <td class="film-details__cell">${actors.join(`, `)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">${LANG.RELEASE_DATE}</td>
                    <td class="film-details__cell">${moment(date).format(`d MMMM YYYY`)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">${LANG.RUNTIME}</td>
                    <td class="film-details__cell">
                        ${moment.duration(duration, `m`).hours()}${LANG.HOURS_SHORT}
                        ${moment.duration(duration, `m`).minutes()}${LANG.MINUTES_SHORT}
                    </td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">${LANG.COUNTRY}</td>
                    <td class="film-details__cell">${country}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">${LANG.GENRES}</td>
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
              ${this.getControlsTemplate(isInWatchlist, isInHistory, isInFavorites)}
            </section>
          </div>
          <div class="form-details__bottom-container">
          </div>
        </form>
      </section>`
    );
  }

  updateControlsSection(...properties) {
    this._controlsSection = this.getElement().querySelector(`.film-details__controls`);
    if (this._controlsSection) {
      this._controlsSection.innerHTML = ``;
      this._controlsSection.insertAdjacentHTML(RENDER_POSITION.BEFORE_END, this.getControlsTemplate(...properties));
    }
  }

  setCloseButtonClickHandler(callback) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, function () {
      callback();
    });
  }

  setFavoriteClickHandler(callback) {
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, function () {
      callback();
    });
  }

  setHistoryClickHandler(callback) {
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, function () {
      callback();
    });
  }

  setWatchlistClickHandler(callback) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, function () {
      callback();
    });
  }
}
