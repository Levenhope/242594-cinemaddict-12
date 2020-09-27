import AbstractView from "./abstract.js";

export default class FilmListView extends AbstractView {
  constructor(isExtraList, title) {
    super();
    this._isExtraList = isExtraList;
    this._title = title;
  }

  getTemplate() {
    return (
      `<section class="${this._isExtraList ? `films-list--extra` : `films-list` }">
        <h2 class="films-list__title ${!this._isExtraList ? `visually-hidden` : ``}">${this._title}</h2>
        <div class="films-list__container"></div>
      </section>`
    );
  }
}
