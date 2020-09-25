import AbstractView from "./abstract.js";
import {LANG} from "../lang.js";
import {SORT_TYPE} from "../const.js";

export default class SortView extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return (
      `<ul class="sort">
        <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SORT_TYPE.DEFAULT}">${LANG.SORT_BY} ${LANG.DEFAULT}</a></li>
        <li><a href="#" class="sort__button" data-sort-type="${SORT_TYPE.DATE}">${LANG.SORT_BY} ${LANG.DATE}</a></li>
        <li><a href="#" class="sort__button" data-sort-type="${SORT_TYPE.RATING}">${LANG.SORT_BY} ${LANG.RATING}</a></li>
      </ul>`
    );
  }

  updateSortView(currentSortType) {
    for (let button of this.getElement().querySelectorAll('.sort__button')) {
      if (button.dataset.sortType === currentSortType) {
        button.classList.add('sort__button--active');
      } else {
        button.classList.remove('sort__button--active');
      }
    }
  }

  setSortTypeChangeHandler(callback) {
    for (let button of this.getElement().querySelectorAll('.sort__button')) {
      button.addEventListener(`click`, function(e) {
        e.preventDefault();
        callback(button.dataset.sortType);
      });
    }
  }
}
