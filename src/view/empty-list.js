import AbstractView from "./abstract.js";
import {LANG} from "../lang.js";

export default class EmptyListView extends AbstractView {
  getTemplate() {
    return (
      `<section class="films-list">
        <h2 class="films-list__title">${LANG.EMPTY_LIST_MESSAGE}</h2>
      </section>`
    );
  }
}
