import AbstractView from "./abstract.js";
import {Lang} from "../lang.js";

export default class EmptyListView extends AbstractView {
  getTemplate() {
    return (
      `<section class="films-list">
        <h2 class="films-list__title">${Lang.EMPTY_LIST_MESSAGE}</h2>
      </section>`
    );
  }
}
