import DetailModalView from "../view/detail-modal";
import {render} from "../utils/render";
import CommentsView from "../view/comments";
import {generateComment} from "../mock/comment";
import CommentItemView from "../view/comment";

export default class DetailModalPresenter {
  constructor(film){
    this._film = film;
    this._detailModalContainer = document.querySelector(`body`);
    this._detailModalComponent = null;
    this._commentsContainer = null;
    this._commentsListElement = null;
    this._filmComments = new Array(this._film.commentsNumber).fill().map(generateComment);
  }

  init() {
    this._setCommentsList();
    this._initClickHandlers();
  }

  _setCommentsList() {
    this._detailModalComponent = new DetailModalView(this._film);
    this._commentsContainer = this._detailModalComponent.getElement().querySelector(`.form-details__bottom-container`);

    render(this._commentsContainer, new CommentsView(this._film.commentsNumber));

    this._commentsListElement = this._detailModalComponent.getElement().querySelector(`.film-details__comments-list`);

    for (let i = 0; i < this._film.commentsNumber; i++) {
      render(this._commentsListElement, new CommentItemView(this._filmComments[i]));
    }

  }

  show() {
      this._detailModalContainer.appendChild(this._detailModalComponent.getElement());
  }

  _initClickHandlers() {
    this._detailModalComponent.setCloseButtonClickHandler(() => {
      this._detailModalContainer.removeChild(this._detailModalComponent.getElement());
    });
  }

}