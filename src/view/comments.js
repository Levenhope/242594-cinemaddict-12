import AbstractView from "./abstract.js";
import {LANG} from "../lang.js";
import {EMOJIS, EMOJIS_DIRECTORY_PATH} from "../const.js";

export default class CommentsView extends AbstractView {
  constructor(commentsCount) {
    super();
    this._commentCount = commentsCount;
  }

  getTemplate() {
    return (
      `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">${LANG.COMMENTS} <span class="film-details__comments-count">${this._commentCount}</span></h3>
        <ul class="film-details__comments-list">
          
        </ul>
        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="${LANG.COMMENT_INPUT_PLACEHOLDER}" name="comment"></textarea>
          </label>
          <div class="film-details__emoji-list">
            ${Object.entries(EMOJIS).reduce((accumulator, [emojiName, fileName]) => accumulator + `
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emojiName}" value="${emojiName}">
              <label class="film-details__emoji-label" for="emoji-${emojiName}">
                <img src="${EMOJIS_DIRECTORY_PATH + fileName}" width="30" height="30" alt="emoji-${emojiName}">
              </label>
            `, ``)}
          </div>
        </div>
      </section>`
    );
  }

  setEmojiClickHandler(callback) {
    for (let label of this.getElement().querySelectorAll(`.film-details__emoji-label`)) {
      label.addEventListener(`click`, function (e) {
        callback(e);
      });
    }
  }

  setSubmitHandler(callback) {
    this.getElement().querySelector('.film-details__comment-input').addEventListener(`keydown`, function (e) {
      if ((e.ctrlKey || e.metaKey) && (e.keyCode == 13 || e.keyCode == 10)) {
        callback(e);
      }
    });
  }
}
