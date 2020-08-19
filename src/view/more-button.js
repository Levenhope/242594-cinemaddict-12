import {createElement} from "../utils.js";
import {LANG} from "../lang.js";

export default class MoreButtonView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return (
      `<button class="films-list__show-more">${LANG.SHOW_MORE}</button>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

