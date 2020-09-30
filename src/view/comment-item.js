import he from "he";
import AbstractView from "./abstract.js";
import {EMOJI_DIRECTORY_PATH, Emoji, EmojiImageSize} from "../const.js";
import {getHumanizedTimestamp} from "../utils/helpers.js";
import {Lang} from "../lang.js";

export default class CommentItemView extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;

    this._deleteButton = this.getElement().querySelector(`.film-details__comment-delete`);

    this._deleteClickHandler = this._deleteClickHandler.bind(this);
  }

  getTemplate() {
    const {id, name, date, commentText, emoji} = this._comment;
    return (
      `<li class="film-details__comment" id="${id}">
        <span class="film-details__comment-emoji">
          <img src="${EMOJI_DIRECTORY_PATH}${Emoji[emoji]}" width="${EmojiImageSize.BIG}" height="${EmojiImageSize.BIG}" alt="emoji-${emoji}">
        </span>
        <div>
          <p class="film-details__comment-text">${he.encode(commentText)}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${name}</span>
            <span class="film-details__comment-day">${getHumanizedTimestamp(date)}</span>
            <button class="film-details__comment-delete">${Lang.DELETE}</button>
          </p>
        </div>
      </li>`
    );
  }

  _deleteClickHandler(e) {
    e.preventDefault();
    this._callback.delete(e.target);
  }

  setDeleteClickHandler(callback) {
    this._callback.delete = callback;
    this._deleteButton.addEventListener(`click`, this._deleteClickHandler);
  }

  removeEventHandlers() {
    this._deleteButton.addEventListener(`click`, this._deleteClickHandler);
  }
}
