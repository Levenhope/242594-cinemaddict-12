import FilmView from "../view/film.js";
import DetailModalPresenter from "./detail-modal.js";
import {render, replace} from "../utils/render.js";

const MODE = {
  DEFAULT: `DEFAULT`,
  MODAL: `MODAL`
};

export default class FilmPresenter {
  constructor(film, changeMode) {
    this._film = film;
    this._changeMode = changeMode;

    this._parent = null;
    this._filmComponent = new FilmView(this._film);
    this._detailModalPresenter = new DetailModalPresenter(this._film);
    this._updatedFilmComponent = null;
    this._mode = MODE.DEFAULT;
  }

  init(parent) {
    this._parent = parent;
    this._detailModalPresenter = new DetailModalPresenter(this._film);
    this._detailModalPresenter.init(this._filmComponent);
    this.setInnerToggles();

    render(this._parent.getElement().querySelector(`.films-list__container`), this._filmComponent);
  }

  update() {
    this._updatedFilmComponent = new FilmView(this._film);
    replace(this._updatedFilmComponent, this._filmComponent);
    this._filmComponent = this._updatedFilmComponent;
    this._detailModalPresenter = new DetailModalPresenter(this._film);
    this._detailModalPresenter.init(this._filmComponent);
    this.setInnerToggles();
  }

  hideModal() {
    this._detailModalPresenter.hide();
    this._mode = MODE.DEFAULT;
  }

  setInnerToggles() {
    this._filmComponent.setInnerElementsClickHandler(() => {
      this._changeMode();
      this._detailModalPresenter = new DetailModalPresenter(this._film);
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
      this.update();
    });
  }

  _setFavoriteToggleHandler() {
    this._filmComponent.setFavoriteClickHandler(() => {
      this._film.isInFavorites = !this._film.isInFavorites;
      this.update();
    });
  }

  _setHistoryToggleHandler() {
    this._filmComponent.setHistoryClickHandler(() => {
      this._film.isInHistory = !this._film.isInHistory;
      this.update();
    });
  }
}
