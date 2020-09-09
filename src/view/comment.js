import AbstractView from "./abstract.js";
import {LANG} from "../lang.js";

export default class CommentItemView extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    const {name, date, commentText, emoji} = this._comment;
    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="${emoji}" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${commentText}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${name}</span>
            <span class="film-details__comment-day">${date}</span>
            <button class="film-details__comment-delete">${LANG.DELETE}</button>
          </p>
        </div>
      </li>`
    );
  }
}
