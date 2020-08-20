import AbstractView from "./abstract.js";
import {getFullYear} from "../utils.js";
import {LANG} from "../lang.js";

export default class BoardView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    const {poster, title, rating, date, duration, genres, description, commentsNumber} = this._film;
    return (
      `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${getFullYear(date)}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genres[0]}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description.length > 140 ? description.substring(0, 140) + `...` : description}</p>
          <a class="film-card__comments">${commentsNumber} ${LANG.COMMENTS}</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">${LANG.ADD} ${LANG.TO} ${LANG.WATCHLIST}</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">${LANG.MARK} ${LANG.AS} ${LANG.WATCHED}</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">${LANG.MARK} ${LANG.AS} ${LANG.FAVORITES}</button>
          </form>
      </article>`
    );
  }
}
