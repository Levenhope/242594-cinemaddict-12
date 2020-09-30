import AbstractView from "./abstract.js";
import {Lang} from "../lang.js";

export default class MoreButtonView extends AbstractView {
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return (
      `<button class="films-list__show-more">${Lang.SHOW_MORE}</button>`
    );
  }

  _clickHandler(e) {
    e.preventDefault();
    this._callback.moreButtonClick();
  }

  setMoreButtonClickHandler(callback) {
    this._callback.moreButtonClick = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }

  removeEventHandler() {
    this.getElement().removeEventListener(`click`, this._clickHandler);
  }
}

