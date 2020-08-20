import AbstractView from "./abstract.js";

export default class FilmListsContainerView extends AbstractView {
  getTemplate() {
    return (
      `<section class="films"></section>`
    );
  }
}
