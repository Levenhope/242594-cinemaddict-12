import {createElement} from "../utils.js";

export default class FilmsListView {
  constructor(isExtraList, title, id) {
    this._isExtraList = isExtraList;
    this._title = title;
    this._id = id;
    this._element = null;
  }

  getTemplate() {
    return (
      `<section class="${this._isExtraList ? `films-list--extra` : `films-list` }">
        <h2 class="films-list__title ${!this._isExtraList ? `visually-hidden` : ``}">${this._title}</h2>
        <div class="films-list__container" id="${this._id}"></div>
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
