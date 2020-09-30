import CommentsView from "../view/comments.js";
import CommentItemView from "../view/comment-item.js";
import CommentsModel from "../model/comments.js";
import {Emoji, EMOJI_DIRECTORY_PATH, UpdateType, EmojiImageSize} from "../const.js";
import {render, replace, remove, renderTemplate, removeInnerElements} from "../utils/render.js";
import {showErrorAnimation} from "../utils/helpers.js";
import {Lang} from "../lang.js";

export default class CommentsPresenter {
  constructor(film, api, parentModal, changeData) {
    this._film = film;
    this._api = api;
    this._parentModal = parentModal;
    this._changeData = changeData;

    this._commentsModel = new CommentsModel();
    this._commentsIdList = this._film.comments;
    this._commentsComponent = null;
    this._filmComments = null;
    this._commentInputElement = null;
    this._emojisListElement = null;
    this._renderedComments = [];
    this._chosenEmoji = null;

    this._submitHandler = this._submitHandler.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
  }

  init() {
    this._setCommentsList();
  }

  destroy() {
    this._commentsComponent.removeEventHandlers();
    this._removeDeleteClickHandlers();
    remove(this._commentsComponent);
  }

  _setCommentsList({update = false} = {}) {
    this._api.getComments(this._film.id)
      .then((comments) => {
        this._commentsModel.setComments(UpdateType.MINOR, comments);
      })
      .then(() => {
        if (update) {
          this._updateComments();
        } else {
          const commentsContainer = this._parentModal.getElement().querySelector(`.form-details__bottom-container`);
          this._commentsComponent = new CommentsView(this._commentsIdList);
          render(commentsContainer, this._commentsComponent);
        }

        this._filmComments = this._commentsModel.getComments();
      }).then(() => {
        this._renderComments();
        this._initCommentForm();

        if (update) {
          this._changeData(UpdateType.MINOR);
        }
      }).catch(() => {
        showErrorAnimation(this._commentInputElement);
        showErrorAnimation(this._emojisListElement);
      });
  }

  _renderComments() {
    const commentsListElement = this._parentModal.getElement().querySelector(`.film-details__comments-list`);
    for (let i = 0; i < this._filmComments.length; i++) {
      const commentItemComponent = new CommentItemView(this._filmComments[i]);

      render(commentsListElement, commentItemComponent);
      this._renderedComments[i] = commentItemComponent;
    }
    this._setDeleteClickHandlers();
  }

  _updateComments() {
    this._commentsComponent.removeEventHandlers();
    this._removeDeleteClickHandlers();
    this._renderedComments = [];
    this._film.comments = this._commentsModel.getComments().map((comment) => comment.id);
    const updatedCommentsComponent = new CommentsView(this._film.comments);
    replace(updatedCommentsComponent, this._commentsComponent);
    this._commentsComponent = updatedCommentsComponent;
  }

  _initCommentForm() {
    this._commentInputElement = this._commentsComponent.getElement().querySelector(`.film-details__comment-input`);
    this._emojisListElement = this._commentsComponent.getElement().querySelector(`.film-details__emoji-list`);

    this._commentsComponent.setEmojiClickHandler(this._emojiClickHandler);
    this._commentsComponent.setSubmitHandler(this._submitHandler);
  }

  _removeDeleteClickHandlers() {
    this._renderedComments.forEach((comment) => comment.removeEventHandlers());
  }

  _setDeleteClickHandlers() {
    this._renderedComments.forEach((comment) => comment.setDeleteClickHandler(this._deleteClickHandler));
  }

  _emojiClickHandler(emojiItem) {
    this._chosenEmoji = emojiItem.value;
    const chosenEmojiContainer = this._commentsComponent.getElement().querySelector(`.film-details__add-emoji-label`);
    const emojiFile = EMOJI_DIRECTORY_PATH + Object.entries(Emoji).filter((emojiFileName) => emojiFileName[0] === this._chosenEmoji)[0][1];

    removeInnerElements(chosenEmojiContainer);
    renderTemplate(chosenEmojiContainer, `<img src="${emojiFile}" width="${EmojiImageSize.BIG}" height="${EmojiImageSize.BIG}" alt="emoji-${this._chosenEmoji}">`);
  }

  _submitHandler(commentInput) {
    commentInput.disabled = true;
    const commentText = commentInput.value;

    if (commentText === ``) {
      showErrorAnimation(this._commentInputElement);
      commentInput.disabled = false;
      return;
    }
    if (this._chosenEmoji === null) {
      showErrorAnimation(this._emojisListElement);
      commentInput.disabled = false;
      return;
    }

    this._api.addComment(this._film.id, {
      commentText,
      date: new Date(),
      emoji: this._chosenEmoji
    }).then(() => {
      this._setCommentsList({update: true});
      commentInput.disabled = false;
      this._chosenEmoji = null;
    }).catch(() => {
      showErrorAnimation(this._commentInputElement);
      showErrorAnimation(this._emojisListElement);
      commentInput.disabled = false;
    });
  }

  _deleteClickHandler(button) {
    const commentToDelete = button.closest(`.film-details__comment`);
    button.textContent = Lang.DELETING;
    button.disabled = true;
    this._api.deleteComment(commentToDelete.id)
      .then(() => {
        this._setCommentsList({update: true});
      }).catch(() => {
        showErrorAnimation(commentToDelete);
        button.textContent = Lang.DELETE;
        button.disabled = false;
      });
  }
}
