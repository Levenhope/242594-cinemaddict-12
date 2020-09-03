import AbstractView from "./abstract.js";
import {LANG} from "../lang.js";

export default class SortView extends AbstractView {
  getTemplate() {
    return (
      `<ul class="sort">
        <li><a href="#" class="sort__button sort__button--active">${LANG.SORT_BY} ${LANG.DEFAULT}</a></li>
        <li><a href="#" class="sort__button">${LANG.SORT_BY} ${LANG.DATE}</a></li>
        <li><a href="#" class="sort__button">${LANG.SORT_BY} ${LANG.RATING}</a></li>
      </ul>`
    );
  }
}

