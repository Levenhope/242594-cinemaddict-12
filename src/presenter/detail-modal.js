import DetailModalView from "../view/detail-modal.js";
import {remove} from "../utils/render.js";
import {UPDATE_TYPE} from "../const";
import CommentsPresenter from "./comments";

export default class DetailModalPresenter {
  constructor(film, changeData, api) {
    this._film = film;
    this._changeData = changeData;
    this._api = api;

    this._detailModalContainer = document.querySelector(`body`);
    this._detailModalComponent = new DetailModalView(this._film);
    this._commentsPresenter = new CommentsPresenter(this._film, this._api, this._detailModalComponent, this._changeData);
  }

  init(filmComponent) {
    this._commentsPresenter.init();
    this._initCloseHandler(filmComponent);
    this._initToggles();
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
      this._api.updateFilm(this._film).then(() => {
        this.update(this._film.isInWatchlist, this._film.isInHistory, this._film.isInFavorites);
      });
    });
  }

  _setFavoriteToggleHandler() {
    this._detailModalComponent.setFavoriteClickHandler(() => {
      this._film.isInFavorites = !this._film.isInFavorites;
      this._api.updateFilm(this._film).then(() => {
        this.update(this._film.isInWatchlist, this._film.isInHistory, this._film.isInFavorites);
      });
    });
  }

  _setHistoryToggleHandler() {
    this._detailModalComponent.setHistoryClickHandler(() => {
      this._film.isInHistory = !this._film.isInHistory;
      this._api.updateFilm(this._film).then(() => {
        this.update(this._film.isInWatchlist, this._film.isInHistory, this._film.isInFavorites);
      });
    });
  }

  update(...properties) {
    this._detailModalComponent.updateControlsSection(...properties);
    this._initToggles();
    this._changeData(UPDATE_TYPE.MINOR);
  }
}
