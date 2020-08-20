import AbstractView from "./abstract.js";

export default class FilmsListView extends AbstractView {
  constructor(isExtraList, title, id) {
    super();
    this._isExtraList = isExtraList;
    this._title = title;
    this._id = id;
  }

  getTemplate() {
    return (
      `<section class="${this._isExtraList ? `films-list--extra` : `films-list` }">
        <h2 class="films-list__title ${!this._isExtraList ? `visually-hidden` : ``}">${this._title}</h2>
        <div class="films-list__container" id="${this._id}"></div>
      </section>`
    );
  }
}
