import {createElement} from "../utils.js";
import {LANG} from "../lang.js";

export default class SortView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return (
      `<ul class="sort">
        <li><a href="#" class="sort__button sort__button--active">${LANG.SORT_BY} ${LANG.DEFAULT}</a></li>
        <li><a href="#" class="sort__button">${LANG.SORT_BY} ${LANG.DATE}</a></li>
        <li><a href="#" class="sort__button">${LANG.SORT_BY} ${LANG.RATING}</a></li>
      </ul>`
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

