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
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}

