import DetailModalView from "../view/detail-modal.js";
import {render, remove, replace} from "../utils/render.js";
import CommentsView from "../view/comments.js";
import {generateComment} from "../mock/comment.js";
import CommentItemView from "../view/comment.js";
import {UPDATE_TYPE, EMOJIS_DIRECTORY_PATH, EMOJIS} from "../const";

export default class DetailModalPresenter {
  constructor(film, changeData) {
    this._film = film;
    this._changeData = changeData;

    this._detailModalContainer = document.querySelector(`body`);
    this._detailModalComponent = new DetailModalView(this._film);
    this._commentsContainer = this._detailModalComponent.getElement().querySelector(`.form-details__bottom-container`);
    this._commentsListElement = null;
    this._commentsComponent = new CommentsView(this._film.comments);
    this._filmComments = this._film.comments.map((item) => {item = item.split(); const commentInfo = generateComment(); item.push(commentInfo); return item;});
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
    for (let i = 0; i < this._film.comments.length; i++) {
      const commentItemComponent = new CommentItemView(this._filmComments[i]);
      render(this._commentsListElement, commentItemComponent);
      this._renderedComments[i] = commentItemComponent;
    }

    this._setDeleteClickHandlers();
    this._setAddFormActions();
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
      chosenEmojiContainer.insertAdjacentHTML(`beforeend`, `<img src="${emoji}" width="55" height="55" alt="emoji-${emojiName}">`);
    });

    this._commentsComponent.setSubmitHandler((e) => {
      const commentText = e.target.value;

      if (commentText === ``) {
        commentInputElement.classList.remove(`error-animate`);
        setTimeout(function () {
          commentInputElement.classList.add(`error-animate`);
        }, 10);
        return;
      }
      if (emoji === ``) {
        emojisListElement.classList.remove(`error-animate`);
        setTimeout(function () {
          emojisListElement.classList.add(`error-animate`);
        }, 10);
        return;
      }

      const date = new Date().toLocaleString(`en-US`, {hour12: false, day: `2-digit`, month: `2-digit`, year: `2-digit`, hour: `numeric`, minute: `numeric`}).split(`,`).join(``);

      this._filmComments.push({
        name: `You`,
        date,
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
