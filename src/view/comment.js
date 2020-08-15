import {createElement} from "../utils.js";

export default class CommentItemView {
  constructor(comment) {
    this._comment = comment;
    this._element = null;
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
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
   </li>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

