import CommentsView from "../view/comments.js";
import {remove, render, replace} from "../utils/render.js";
import CommentItemView from "../view/comment.js";
import {EMOJIS, EMOJIS_DIRECTORY_PATH, UPDATE_TYPE, ERROR_ANIMATION_TIMEOUT, EMOJI_WIDTH, EMOJI_HEIGHT, DEFAULT_USER_NAME, RENDER_POSITION} from "../const.js";
import CommentsModel from "../model/comments.js";
import {LANG} from "../lang.js";
import moment from "moment";

export default class CommentsPresenter {
  constructor(film, api, parentModal, changeData) {
    this._film = film;
    this._api = api;
    this._parentModal = parentModal;
    this._changeData = changeData;

    this._commentsModel = new CommentsModel();
    this._commentsContainer = this._parentModal.getElement().querySelector(`.form-details__bottom-container`);
    this._commentsListElement = null;
    this._commentsComponent = new CommentsView(this._film.comments);
    this._filmComments = null;
    this._renderedComments = [];
  }

  init() {
    this._setCommentsList();
  }

  _setCommentsList() {
    this._api.getComments(this._film.id)
      .then((comments) => {
        this._commentsModel.setComments(UPDATE_TYPE.MINOR, comments);
      })
      .then(() => {
        render(this._commentsContainer, this._commentsComponent);
        this._commentsListElement = this._parentModal.getElement().querySelector(`.film-details__comments-list`);
        this._filmComments = this._commentsModel.getComments();
        for (let i = 0; i < this._filmComments.length; i++) {
          const commentItemComponent = new CommentItemView(this._filmComments[i]);
          render(this._commentsListElement, commentItemComponent);
          this._renderedComments[i] = commentItemComponent;
        }
        this._setDeleteClickHandlers();
        this._setAddFormActions();
      }).catch(() => {
        this._commentsContainer.prepend(`${LANG.SERVER_ERROR}`);
      });
  }

  _setAddFormActions() {
    let emoji = ``;
    const commentInputElement = this._commentsComponent.getElement().querySelector(`.film-details__comment-input`);
    const emojisListElement = this._commentsComponent.getElement().querySelector(`.film-details__emoji-list`);

    this._commentsComponent.setEmojiClickHandler((e) => {
      const chosenEmojiContainer = this._commentsComponent.getElement().querySelector(`.film-details__add-emoji-label`);
      chosenEmojiContainer.innerHTML = ``;
      let emojiName = e.target.htmlFor ? e.target.htmlFor : e.target.parentElement.htmlFor;
      emojiName = emojiName.substr(6, emojiName.length + 1);
      emoji = EMOJIS_DIRECTORY_PATH + Object.entries(EMOJIS).filter((item) => item[0] === emojiName)[0][1];
      chosenEmojiContainer.insertAdjacentHTML(RENDER_POSITION.BEFORE_END, `<img src="${emoji}" width="${EMOJI_WIDTH}" height="${EMOJI_HEIGHT}" alt="emoji-${emojiName}">`);
    });

    this._commentsComponent.setSubmitHandler((e) => {
      const commentText = e.target.value;

      if (commentText === ``) {
        commentInputElement.classList.remove(`error-animate`);
        setTimeout(function () {
          commentInputElement.classList.add(`error-animate`);
        }, ERROR_ANIMATION_TIMEOUT);
        return;
      }
      if (emoji === ``) {
        emojisListElement.classList.remove(`error-animate`);
        setTimeout(function () {
          emojisListElement.classList.add(`error-animate`);
        }, ERROR_ANIMATION_TIMEOUT);
        return;
      }

      this._filmComments.push({
        name: DEFAULT_USER_NAME,
        date: new Date(),
        commentText,
        emoji
      });

      this._handleCommentsUpdate();
    });
  }

  _setDeleteClickHandlers() {
    for (let i = 0; i < this._renderedComments.length; i++) {
      this._renderedComments[i].setDeleteClickHandler(() => {
        remove(this._renderedComments[i]);
        this._filmComments.splice(i, 1);

        this._handleCommentsUpdate();
      });
    }
  }

  _handleCommentsUpdate() {
    this._film.comments = this._filmComments;
    const updatedCommentsComponent = new CommentsView(this._film.comments);
    replace(updatedCommentsComponent, this._commentsComponent);
    this._commentsComponent = updatedCommentsComponent;
    this._setCommentsList();
    this._changeData(UPDATE_TYPE.MINOR);
  }
}
