import he from "he";
import AbstractView from "./abstract.js";
import {LANG} from "../lang.js";

export default class CommentItemView extends AbstractView {
  constructor(comment) {
    super();
    this._commentId = comment[0];
    this._commentInfo = comment[1];
  }

  getTemplate() {
    const {name, date, commentText, emoji} = this._commentInfo;
    return (
      `<li class="film-details__comment" id="${this._commentId}">
        <span class="film-details__comment-emoji">
          <img src="${emoji}" width="55" height="55" alt="emoji">
        </span>
        <div>
          <p class="film-details__comment-text">${he.encode(commentText)}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${name}</span>
            <span class="film-details__comment-day">${date}</span>
            <button class="film-details__comment-delete">${LANG.DELETE}</button>
          </p>
        </div>
      </li>`
    );
  }

  setDeleteClickHandler(callback) {
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, callback);
  }
}
