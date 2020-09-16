import FilmView from "../view/film.js";
import DetailModalPresenter from "./detail-modal.js";
import {render, replace, remove} from "../utils/render.js";
import {UPDATE_TYPE} from "../const.js";

const MODE = {
  DEFAULT: `DEFAULT`,
  MODAL: `MODAL`
};

export default class FilmPresenter {
  constructor(film, parent, changeMode, changeData) {
    this._film = film;
    this._parent = parent;
    this._changeMode = changeMode;
    this._changeData = changeData;

    this._filmComponent = new FilmView(this._film);
    this._detailModalPresenter = new DetailModalPresenter(this._film, this._changeData);
    this._mode = MODE.DEFAULT;
  }

  init() {
    this._detailModalPresenter.init(this._filmComponent);
    this.setInnerToggles();

    render(this._parent.getElement().querySelector(`.films-list__container`), this._filmComponent);
  }

  destroy() {
    remove(this._filmComponent);
  }

  hideModal() {
    this._detailModalPresenter.hide();
    this._mode = MODE.DEFAULT;
  }

  setInnerToggles() {
    this._filmComponent.setInnerElementsClickHandler(() => {
      this._changeMode();
      this._detailModalPresenter = new DetailModalPresenter(this._film, this._changeData);
      this._detailModalPresenter.init(this._filmComponent);
      this._detailModalPresenter.show();
      this._mode = MODE.MODAL;
    });
    this._setWatchlistToggleHandler();
    this._setFavoriteToggleHandler();
    this._setHistoryToggleHandler();
  }

  _setWatchlistToggleHandler() {
    this._filmComponent.setWatchlistClickHandler(() => {
      this._film.isInWatchlist = !this._film.isInWatchlist;
      this._changeData(UPDATE_TYPE.MINOR);
    });
  }

  _setFavoriteToggleHandler() {
    this._filmComponent.setFavoriteClickHandler(() => {
      this._film.isInFavorites = !this._film.isInFavorites;
      this._changeData(UPDATE_TYPE.MINOR);
    });
  }

  _setHistoryToggleHandler() {
    this._filmComponent.setHistoryClickHandler(() => {
      this._film.isInHistory = !this._film.isInHistory;
      this._changeData(UPDATE_TYPE.MINOR);
    });
  }
}
