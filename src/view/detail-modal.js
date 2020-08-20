import AbstractView from "./abstract.js";
import {getReadableDate} from "../utils.js";
import {LANG} from "../lang.js";

export default class DetailModalView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    const {poster, title, originalTitle, rating, date, duration, genres, description, director, writers, actors, country, age} = this._film;
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
                <p class="film-details__age">${age}</p>
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
                    <td class="film-details__cell">${writers}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">${LANG.ACTORS}</td>
                    <td class="film-details__cell">${actors}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">${LANG.RELEASE_DATE}</td>
                    <td class="film-details__cell">${getReadableDate(date)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">${LANG.RUNTIME}</td>
                    <td class="film-details__cell">${duration}</td>
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
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">${LANG.ADD} ${LANG.TO} ${LANG.WATCHLIST}</label>
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
              <label for="watched" class="film-details__control-label film-details__control-label--watched">${LANG.ALREADY} ${LANG.WATCHED}</label>
              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite">${LANG.ADD} ${LANG.TO} ${LANG.FAVORITES}</label>
            </section>
          </div>
          <div class="form-details__bottom-container">
            
          </div>
        </form>
      </section>`
    );
  }
}
