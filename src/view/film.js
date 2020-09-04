import AbstractView from "./abstract.js";
import {LANG} from "../lang.js";

export default class FilmView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    const {id, poster, title, rating, date, duration, genres, description, commentsNumber, isInWatchlist, isInFavorites, isInHistory} = this._film;
    return (
      `<article class="film-card" id="${id}">
        <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${date.getFullYear()}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genres[0]}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description.length > 140 ? description.substring(0, 140) + `...` : description}</p>
          <a class="film-card__comments">${commentsNumber} ${LANG.COMMENTS}</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isInWatchlist ? `film-card__controls-item--active` : ``}">${LANG.ADD} ${LANG.TO} ${LANG.WATCHLIST}</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isInHistory ? `film-card__controls-item--active` : ``}">${LANG.MARK} ${LANG.AS} ${LANG.WATCHED}</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${isInFavorites ? `film-card__controls-item--active` : ``}">${LANG.MARK} ${LANG.AS} ${LANG.FAVORITES}</button>
          </div>
      </article>`
    );
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
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, function(e){
      e.preventDefault();
      callback();
    });
  }

  setHistoryClickHandler(callback) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, function(e){
      e.preventDefault();
      callback();
    });
  }

  setWatchlistClickHandler(callback) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, function(e){
      e.preventDefault();
      callback();
    });
  }
}
