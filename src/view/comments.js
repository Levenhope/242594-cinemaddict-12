import AbstractView from "./abstract.js";
import {Lang} from "../lang.js";
import {Emoji, EMOJI_DIRECTORY_PATH, EmojiImageSize} from "../const.js";

export default class CommentsView extends AbstractView {
  constructor(comments) {
    super();
    this._commentCount = comments.length;
  }

  getTemplate() {
    return (
      `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">${Lang.COMMENTS} <span class="film-details__comments-count">${this._commentCount}</span></h3>
        <ul class="film-details__comments-list">
          
        </ul>
        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="${Lang.COMMENT_INPUT_PLACEHOLDER}" name="comment"></textarea>
          </label>
          <div class="film-details__emoji-list">
            ${Object.entries(Emoji).reduce((emojiInputs, [emojiName, fileName]) => emojiInputs + `
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emojiName}" value="${emojiName}">
              <label class="film-details__emoji-label" for="emoji-${emojiName}">
                <img src="${EMOJI_DIRECTORY_PATH}${fileName}" width="${EmojiImageSize.SMALL}" height="${EmojiImageSize.SMALL}" alt="emoji-${emojiName}">
              </label>
            `, ``)}
          </div>
        </div>
      </section>`
    );
  }

  setEmojiClickHandler(callback) {
    for (let label of this.getElement().querySelectorAll(`.film-details__emoji-label`)) {
      label.addEventListener(`click`, function () {
        callback(label);
      });
    }
  }

  setSubmitHandler(callback) {
    const commentInput = this.getElement().querySelector(`.film-details__comment-input`);
    commentInput.addEventListener(`keydown`, function (e) {
      if ((e.ctrlKey || e.metaKey || e.keyCode === 17) && (e.enter || e.keyCode === 13 || e.keyCode === 10)) {
        callback(commentInput);
      }
    });
  }
}
