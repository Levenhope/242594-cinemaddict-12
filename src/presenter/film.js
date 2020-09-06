import FilmView from "../view/film.js";
import DetailModalPresenter from "./detail-modal.js";
import {render, replace} from "../utils/render.js";

export default class FilmPresetner {
  constructor(parent, film) {
    this._film = film;
    this._parent = parent;

    this._cardComponent = new FilmView(this._film);
    this._detailModalPresenter = new DetailModalPresenter(this._film);
    this._updatedCardComponent = null;
  }

  init() {

    this.setInnerToggles();

    render(this._parent.getElement().querySelector(`.films-list__container`), this._cardComponent);

  }

  _update() {
    this._updatedCardComponent = new FilmView(this._film);
    this._detailModalPresenter = new DetailModalPresenter(this._film);
    replace(this._updatedCardComponent, this._cardComponent);
    this._cardComponent = this._updatedCardComponent;
    this.setInnerToggles();
    this._detailModalPresenter.init();
  }

  setInnerToggles() {
    this._cardComponent.setInnerElementsClickHandler(() => {
      this._detailModalPresenter.show();
    });
    this._setWatchlistToggleHandler();
    this._setFavoriteToggleHandler();
    this._setHistoryToggleHandler();
  }

  _setWatchlistToggleHandler() {
    this._cardComponent.setWatchlistClickHandler(() => {
      this._film.isInWatchlist = !this._film.isInWatchlist;
      this._update();
    });
  }

  _setFavoriteToggleHandler() {
    this._cardComponent.setFavoriteClickHandler(() => {
      this._film.isInFavorites = !this._film.isInFavorites;
      this._update();
    });
  }

  _setHistoryToggleHandler() {
    this._cardComponent.setHistoryClickHandler(() => {
      this._film.isInHistory = !this._film.isInHistory;
      this._update();
    });
  }
}