import {createElement} from "../utils.js";
import {LANG} from "../lang.js";

export default class EmptyListView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return (
      `<section class="films-list">
        <h2 class="films-list__title">${LANG.EMPTY_LIST_MESSAGE}</h2>
      </section>`
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
