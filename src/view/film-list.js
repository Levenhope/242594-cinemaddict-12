import AbstractView from "./abstract.js";

export default class FilmListView extends AbstractView {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return (
      `<section class="films-list">
        <h2 class="films-list__title visually-hidden">${this._title}</h2>
        <div class="films-list__container"></div>
      </section>`
    );
  }
}
