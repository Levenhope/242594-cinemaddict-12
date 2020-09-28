import CommentsPresenter from "./comments.js";
import DetailModalView from "../view/detail-modal.js";
import {render, remove} from "../utils/render.js";
import {UpdateType} from "../const.js";

export default class DetailModalPresenter {
  constructor(film, filmComponent, changeData, api, changeMode) {
    this._film = film;
    this._filmComponent = filmComponent;
    this._changeData = changeData;
    this._api = api;
    this._changeMode = changeMode;

    this._detailModalContainer = document.querySelector(`body`);
    this._detailModalComponent = new DetailModalView(this._film);
    this._commentsPresenter = new CommentsPresenter(this._film, this._api, this._detailModalComponent, this._changeData);

    this._handleEscKeyDownEvent = this._handleEscKeyDownEvent.bind(this);
  }

  init() {
    render(this._detailModalContainer, this._detailModalComponent);
    this._commentsPresenter.init();
    this._initCloseHandler();
    this._initToggles();
    document.addEventListener(`keydown`, this._handleEscKeyDownEvent);
  }

  destroy() {
    remove(this._detailModalComponent);
    document.removeEventListener(`keydown`, this._handleEscKeyDownEvent);
  }

  _update(...userFilmProperties) {
    this._detailModalComponent.updateControlsSection(...userFilmProperties);
    this._filmComponent.updateControlsSection(...userFilmProperties);
    this._changeData(UpdateType.MINOR);
  }

  _initCloseHandler() {
    this._detailModalComponent.setCloseButtonClickHandler(() => {
      this.destroy();
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
      this._api.updateFilm(this._film).then(() => {
        this._update(this._film.isInWatchlist, this._film.isInHistory, this._film.isInFavorites);
      });
    });
  }

  _setFavoriteToggleHandler() {
    this._detailModalComponent.setFavoriteClickHandler(() => {
      this._film.isInFavorites = !this._film.isInFavorites;
      this._api.updateFilm(this._film).then(() => {
        this._update(this._film.isInWatchlist, this._film.isInHistory, this._film.isInFavorites);
      });
    });
  }

  _setHistoryToggleHandler() {
    this._detailModalComponent.setHistoryClickHandler(() => {
      this._film.isInHistory = !this._film.isInHistory;
      this._api.updateFilm(this._film).then(() => {
        this._update(this._film.isInWatchlist, this._film.isInHistory, this._film.isInFavorites);
      });
    });
  }

  _handleEscKeyDownEvent(e) {
    if (e.key === `Escape` || e.key === `Esc` || e.keyCode === 27) {
      e.preventDefault();
      this.destroy();
    }
  }
}
