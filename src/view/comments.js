import AbstractView from "./abstract.js";
import {LANG} from "../lang.js";
import {EMOJIS} from "../const.js";

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
            ${EMOJIS.map((emoji) => `
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
              <label class="film-details__emoji-label" for="emoji-${emoji}">
                <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
              </label>
            `).join(``)}
          </div>
        </div>
      </section>`
    );
  }

  setEmojiClickHandler(callback) {
    for(let label of this.getElement().querySelectorAll(`.film-details__emoji-label`)) {
      label.addEventListener(`click`, function(e){
        callback(e);
      });
    }
  }
}
