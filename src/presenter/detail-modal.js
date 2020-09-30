import CommentsPresenter from "./comments.js";
import DetailModalView from "../view/detail-modal.js";
import {render, remove} from "../utils/render.js";
import {UpdateType} from "../const.js";

export default class DetailModalPresenter {
  constructor(film, filmComponent, changeData, api) {
    this._film = film;
    this._filmComponent = filmComponent;
    this._changeData = changeData;
    this._api = api;

    this._detailModalContainer = document.querySelector(`body`);
    this._detailModalComponent = new DetailModalView(this._film);
    this._commentsPresenter = new CommentsPresenter(this._film, this._api, this._detailModalComponent, this._changeData);

    this._handleEscKeyDownEvent = this._handleEscKeyDownEvent.bind(this);
    this._watchlistToggleHandler = this._watchlistToggleHandler.bind(this);
    this._favoriteToggleHandler = this._favoriteToggleHandler.bind(this);
    this._historyToggleHandler = this._historyToggleHandler.bind(this);
    this._closeHandler = this._closeHandler.bind(this);
  }

  init() {
    render(this._detailModalContainer, this._detailModalComponent);
    this._commentsPresenter.init();
    this._initClickHandlers();
    document.addEventListener(`keydown`, this._handleEscKeyDownEvent);
  }

  destroy() {
    this._commentsPresenter.destroy();
    this._detailModalComponent.removeEventHandlers();
    remove(this._detailModalComponent);
    document.removeEventListener(`keydown`, this._handleEscKeyDownEvent);
    this._changeData(UpdateType.MINOR);
  }

  _updateInterface(...userFilmProperties) {
    this._detailModalComponent.updateControlsSection(...userFilmProperties);
    this._filmComponent.updateControlsSection(...userFilmProperties);
  }

  _updateApiFilm() {
    this._api.updateFilm(this._film).then(() => {
      this._updateInterface(this._film.isInWatchlist, this._film.isInHistory, this._film.isInFavorites);
    });
  }

  _closeHandler() {
    this.destroy();
  }

  _watchlistToggleHandler() {
    this._film.isInWatchlist = !this._film.isInWatchlist;
    this._updateApiFilm();
  }

  _favoriteToggleHandler() {
    this._film.isInFavorites = !this._film.isInFavorites;
    this._updateApiFilm();
  }

  _historyToggleHandler() {
    this._film.isInHistory = !this._film.isInHistory;
    this._updateApiFilm();
  }

  _initClickHandlers() {
    this._detailModalComponent.setCloseButtonClickHandler(this._closeHandler);
    this._detailModalComponent.setWatchlistClickHandler(this._watchlistToggleHandler);
    this._detailModalComponent.setFavoriteClickHandler(this._favoriteToggleHandler);
    this._detailModalComponent.setHistoryClickHandler(this._historyToggleHandler);
  }

  _handleEscKeyDownEvent(e) {
    if (e.key === `Escape` || e.key === `Esc` || e.keyCode === 27) {
      e.preventDefault();
      this.destroy();
    }
  }
}
