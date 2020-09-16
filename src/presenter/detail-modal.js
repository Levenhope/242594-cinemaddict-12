import DetailModalView from "../view/detail-modal.js";
import {render, remove, replace} from "../utils/render.js";
import CommentsView from "../view/comments.js";
import {generateComment} from "../mock/comment.js";
import CommentItemView from "../view/comment.js";
import {UPDATE_TYPE, EMOJIS_DIRECTORY_PATH} from "../const";

export default class DetailModalPresenter {
  constructor(film, changeData) {
    this._film = film;
    this._changeData = changeData;

    this._detailModalContainer = document.querySelector(`body`);
    this._detailModalComponent = new DetailModalView(this._film);
    this._commentsContainer = this._detailModalComponent.getElement().querySelector(`.form-details__bottom-container`);
    this._commentsListElement = null;
    this._commentsComponent = new CommentsView(this._film.commentsNumber);
    this._filmComments = new Array(this._film.commentsNumber).fill().map(generateComment);
    this._newComment = {};
    this._renderedComments = [];
  }

  init(filmComponent) {
    this._setCommentsList();
    this._initCloseHandler(filmComponent);
    this._initToggles();
  }

  _setCommentsList() {
    render(this._commentsContainer, this._commentsComponent);
    this._commentsListElement = this._detailModalComponent.getElement().querySelector(`.film-details__comments-list`);

    for (let i = 0; i < this._film.commentsNumber; i++) {
      const commentItemComponent = new CommentItemView(this._filmComments[i]);
      render(this._commentsListElement, commentItemComponent);
      this._renderedComments[i] = commentItemComponent;
    }

    this._setDeleteClickHandlers();
    this._setAddFormActions();
  }

  _setAddFormActions() {
    this._commentsComponent.setEmojiClickHandler((e) => {
      const chosenEmojiContainer = this._commentsComponent.getElement().querySelector(`.film-details__add-emoji-label`);
      chosenEmojiContainer.innerHTML = ``;
      let emoji = e.target.htmlFor ? e.target.htmlFor : e.target.parentElement.htmlFor;
      emoji = emoji.substr(6, emoji.length + 1);
      chosenEmojiContainer.insertAdjacentHTML(`beforeend`, `<img src="${EMOJIS_DIRECTORY_PATH}${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`);
      this._newComment.emoji = emoji;
    });
  }

  _setDeleteClickHandlers() {
    for(let i = 0; i < this._renderedComments.length; i++) {
      this._renderedComments[i].setDeleteClickHandler(() => {
        remove(this._renderedComments[i]);
        this._filmComments.splice(i, 1);
        this._renderedComments.splice(i, 1);
        this._film.commentsNumber -= 1;
        this._changeData(UPDATE_TYPE.MINOR);

        const updatedCommentsComponent = new CommentsView(this._film.commentsNumber);
        replace(updatedCommentsComponent, this._commentsComponent);
        this._commentsComponent = updatedCommentsComponent;
        this._setCommentsList();
      })
    }
  }

  show() {
    this._detailModalContainer.appendChild(this._detailModalComponent.getElement());
  }

  hide() {
    remove(this._detailModalComponent);
  }

  _initCloseHandler(filmComponent) {
    this._detailModalComponent.setCloseButtonClickHandler(() => {
      this.hide();
      filmComponent.updateControlsSection(this._film.isInWatchlist, this._film.isInHistory, this._film.isInFavorites);
      filmComponent.restoreHandlers();
    });
  }

  _initToggles() {
    this._setWatchlistToggleHandler();
    this._setFavoriteToggleHandler();
    this._setHistoryToggleHandler();
  }

  _setWatchlistToggleHandler() {
    this._detailModalComponent.setWatchlistClickHandler(() => {
      this._film.isInWatchlist = !this._film.isInWatchlist;
      this.update(this._film.isInWatchlist, this._film.isInHistory, this._film.isInFavorites);
    });
  }

  _setFavoriteToggleHandler() {
    this._detailModalComponent.setFavoriteClickHandler(() => {
      this._film.isInFavorites = !this._film.isInFavorites;
      this.update(this._film.isInWatchlist, this._film.isInHistory, this._film.isInFavorites);
    });
  }

  _setHistoryToggleHandler() {
    this._detailModalComponent.setHistoryClickHandler(() => {
      this._film.isInHistory = !this._film.isInHistory;
      this.update(this._film.isInWatchlist, this._film.isInHistory, this._film.isInFavorites);
    });
  }

  update(...properties) {
    this._detailModalComponent.updateControlsSection(...properties);
    this._initToggles();
    this._changeData(UPDATE_TYPE.MINOR);
  }
}
