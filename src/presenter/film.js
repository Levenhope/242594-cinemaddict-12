import DetailModalPresenter from "./detail-modal.js";
import FilmView from "../view/film.js";
import {render, remove} from "../utils/render.js";
import {UpdateType, ScreenMode} from "../const.js";

export default class FilmPresenter {
  constructor(film, parent, changeMode, changeData, api) {
    this._film = film;
    this._parent = parent;
    this._changeMode = changeMode;
    this._changeData = changeData;
    this._api = api;

    this.mode = ScreenMode.DEFAULT;
    this._filmComponent = new FilmView(this._film);
    this._detailModalPresenter = new DetailModalPresenter(this._film, this._filmComponent, this._changeData, this._api);
  }

  init() {
    render(this._parent.getElement().querySelector(`.films-list__container`), this._filmComponent);
    this._setInnerToggles();
  }

  destroy() {
    this._filmComponent.removeEventHandlers();
    remove(this._filmComponent);
  }

  hideModal() {
    this._detailModalPresenter.destroy();
    this.mode = ScreenMode.DEFAULT;
  }

  _setInnerToggles() {
    this._filmComponent.setInnerElementsClickHandler(() => {
      this._changeMode();
      this._detailModalPresenter.init();
      this.mode = ScreenMode.MODAL;
    });

    this._setWatchlistToggleHandler();
    this._setFavoriteToggleHandler();
    this._setHistoryToggleHandler();
  }

  _updateApiFilm() {
    this._api.updateFilm(this._film).then(() => {
      this._changeData(UpdateType.MINOR);
      this._filmComponent.updateControlsSection(this._film.isInWatchlist, this._film.isInHistory, this._film.isInFavorites);
    });
  }

  _setWatchlistToggleHandler() {
    this._filmComponent.setWatchlistClickHandler(() => {
      this._film.isInWatchlist = !this._film.isInWatchlist;
      this._updateApiFilm();
    });
  }

  _setFavoriteToggleHandler() {
    this._filmComponent.setFavoriteClickHandler(() => {
      this._film.isInFavorites = !this._film.isInFavorites;
      this._updateApiFilm();
    });
  }

  _setHistoryToggleHandler() {
    this._filmComponent.setHistoryClickHandler(() => {
      this._film.isInHistory = !this._film.isInHistory;
      if (this._film.isInHistory) {
        this._film.watchingDate = new Date();
      }
      this._updateApiFilm();
    });
  }
}
