import AbstractView from "./abstract.js";
import {Lang} from "../lang.js";

export default class MoreButtonView extends AbstractView {
  constructor() {
    super();

    this._moreButtonClickHandler = this._moreButtonClickHandler.bind(this);
  }

  getTemplate() {
    return (
      `<button class="films-list__show-more">${Lang.SHOW_MORE}</button>`
    );
  }

  _moreButtonClickHandler(e) {
    e.preventDefault();
    this._callback.moreButtonClick();
  }

  setMoreButtonClickHandler(callback) {
    this._callback.moreButtonClick = callback;
    this.getElement().addEventListener(`click`, this._moreButtonClickHandler);
  }

  removeEventHandler() {
    this.getElement().removeEventListener(`click`, this._moreButtonClickHandler);
  }
}

