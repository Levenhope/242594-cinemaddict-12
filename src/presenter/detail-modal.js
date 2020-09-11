import DetailModalView from "../view/detail-modal.js";
import {render, remove} from "../utils/render.js";
import CommentsView from "../view/comments.js";
import {generateComment} from "../mock/comment.js";
import CommentItemView from "../view/comment.js";

export default class DetailModalPresenter {
  constructor(film) {
    this._film = film;
    this._detailModalContainer = document.querySelector(`body`);
    this._detailModalComponent = new DetailModalView(this._film);
    this._commentsContainer = null;
    this._commentsListElement = null;
    this._filmComments = new Array(this._film.commentsNumber).fill().map(generateComment);
    this._newComment = {};
  }

  init(filmComponent) {
    this._setCommentsList();
    this._initCloseHandler(filmComponent);
    this._initToggles();
  }

  _setCommentsList() {
    this._commentsContainer = this._detailModalComponent.getElement().querySelector(`.form-details__bottom-container`);
    this._commentsComponent = new CommentsView(this._film.commentsNumber);

    render(this._commentsContainer, this._commentsComponent);

    this._commentsListElement = this._detailModalComponent.getElement().querySelector(`.film-details__comments-list`);

    for (let i = 0; i < this._film.commentsNumber; i++) {
      render(this._commentsListElement, new CommentItemView(this._filmComments[i]));
    }
    this._commentsComponent.setEmojiClickHandler((e) => {
      const chosenEmojiContainer = this._commentsComponent.getElement().querySelector(`.film-details__add-emoji-label`);
      chosenEmojiContainer.innerHTML = ``;
      let emoji = e.target.htmlFor ? e.target.htmlFor : e.target.parentElement.htmlFor;
      emoji = emoji.substr(6, emoji.length + 1);
      chosenEmojiContainer.insertAdjacentHTML(`beforeend`, `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`);
      this._newComment.emoji = emoji;
    });
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
  }
}
