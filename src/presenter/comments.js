import CommentsView from "../view/comments.js";
import {render, replace} from "../utils/render.js";
import CommentItemView from "../view/comment.js";
import {EMOJIS, EMOJIS_DIRECTORY_PATH, UPDATE_TYPE, EMOJI_WIDTH, EMOJI_HEIGHT, RENDER_POSITION} from "../const.js";
import CommentsModel from "../model/comments.js";
import {LANG} from "../lang.js";
import {showErrorAnimation} from "../utils/comment.js";

export default class CommentsPresenter {
  constructor(film, api, parentModal, changeData) {
    this._film = film;
    this._api = api;
    this._parentModal = parentModal;
    this._changeData = changeData;

    this._commentsModel = new CommentsModel();
    this._commentsContainer = this._parentModal.getElement().querySelector(`.form-details__bottom-container`);
    this._commentsIdList = this._film.comments;
    this._commentsComponent = new CommentsView(this._commentsIdList);
    this._commentsListElement = null;
    this._filmComments = null;
    this._commentInputElement = null;
    this._emojisListElement = null;
    this._renderedComments = [];
  }

  init() {
    this._setCommentsList();
  }

  _setCommentsList({update = false} = {}) {
    this._api.getComments(this._film.id)
      .then((comments) => {
        this._commentsModel.setComments(UPDATE_TYPE.MINOR, comments);
      })
      .then(() => {
        if (update) {
          this._film.comments = this._commentsModel.getComments().map((comment) => comment.id);
          const updatedCommentsComponent = new CommentsView(this._film.comments);
          replace(updatedCommentsComponent, this._commentsComponent);
          this._commentsComponent = updatedCommentsComponent;
        } else {
          render(this._commentsContainer, this._commentsComponent);
        }

        this._commentInputElement = this._commentsComponent.getElement().querySelector(`.film-details__comment-input`);
        this._emojisListElement = this._commentsComponent.getElement().querySelector(`.film-details__emoji-list`);
        this._commentsListElement = this._parentModal.getElement().querySelector(`.film-details__comments-list`);

        if (update) {
          this._commentInputElement.setAttribute(`disabled`, `disabled`);
        }

        this._filmComments = this._commentsModel.getComments();
      }).then(() => {
        for (let i = 0; i < this._filmComments.length; i++) {
          const commentItemComponent = new CommentItemView(this._filmComments[i]);
          render(this._commentsListElement, commentItemComponent);
          this._renderedComments[i] = commentItemComponent;
        }

        this._setDeleteClickHandlers();
        this._setFormActions();

        if (update) {
          this._commentInputElement.removeAttribute(`disabled`);
          this._changeData(UPDATE_TYPE.MINOR);
        }
      });
  }

  _setFormActions() {
    let emoji = ``;
    let emojiName = ``;

    this._commentsComponent.setEmojiClickHandler((e) => {
      const chosenEmojiContainer = this._commentsComponent.getElement().querySelector(`.film-details__add-emoji-label`);
      chosenEmojiContainer.innerHTML = ``;
      emojiName = e.target.htmlFor ? e.target.htmlFor : e.target.parentElement.htmlFor;
      emojiName = emojiName.substr(6, emojiName.length + 1);
      emoji = EMOJIS_DIRECTORY_PATH + Object.entries(EMOJIS).filter((item) => item[0] === emojiName)[0][1];
      chosenEmojiContainer.insertAdjacentHTML(RENDER_POSITION.BEFORE_END, `<img src="${emoji}" width="${EMOJI_WIDTH}" height="${EMOJI_HEIGHT}" alt="emoji-${emojiName}">`);
    });

    this._commentsComponent.setSubmitHandler((e) => {
      const commentText = e.target.value;

      if (commentText === ``) {
        showErrorAnimation(this._commentInputElement);
        return;
      }
      if (emoji === ``) {
        showErrorAnimation(this._emojisListElement);
        return;
      }

      this._api.addComment(this._film.id, {
        commentText,
        date: new Date(),
        emoji: emojiName
      }).then(this._handleCommentsUpdate())
        .catch(() => {
          showErrorAnimation(this._commentInputElement);
          showErrorAnimation(this._emojisListElement);
        });
    });
  }

  _handleCommentsUpdate() {
    this._renderedComments = [];
    this._setCommentsList({update: true});
  }

  _setDeleteClickHandlers() {
    for (let i = 0; i < this._renderedComments.length; i++) {
      this._renderedComments[i].setDeleteClickHandler((button) => {
        button.textContent = LANG.DELETING;
        button.setAttribute(`disabled`, `disabled`);
        this._api.deleteComment(this._filmComments[i].id)
          .then(() => {
            this._handleCommentsUpdate();
          }).catch(() => {
            showErrorAnimation(this._renderedComments[i].getElement());
            button.textContent = LANG.DELETE;
            button.removeAttribute(`disabled`);
          });
      });
    }
  }
}
