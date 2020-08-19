import {createElement} from "../utils.js";
import {LANG} from "../lang.js";

export default class StatsView {
  constructor(number) {
    this._number = number;
    this._element = null;
  }

  getTemplate() {
    return (
      `<p>${this._number} ${LANG.FILMS_STATS_MESSAGE}</p>`
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
