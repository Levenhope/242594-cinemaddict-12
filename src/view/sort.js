import AbstractView from "./abstract.js";
import {Lang} from "../lang.js";
import {SortType} from "../const.js";

export default class SortView extends AbstractView {
  constructor() {
    super();

    this._sortButtons = this.getElement().querySelectorAll(`.sort__button`);
  }

  getTemplate() {
    return (
      `<ul class="sort">
        <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">${Lang.SORT_BY} ${Lang.DEFAULT}</a></li>
        <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">${Lang.SORT_BY} ${Lang.DATE}</a></li>
        <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">${Lang.SORT_BY} ${Lang.RATING}</a></li>
      </ul>`
    );
  }

  updateSortView(currentSortType) {
    this._sortButtons.forEach((button) => {
      if (button.dataset.sortType === currentSortType) {
        button.classList.add(`sort__button--active`);
      } else {
        button.classList.remove(`sort__button--active`);
      }
    });
  }

  setSortTypeChangeHandler(callback) {
    this._sortButtons.forEach((button) => {
      button.addEventListener(`click`, function (e) {
        e.preventDefault();
        callback(button.dataset.sortType);
      });
    });
  }
}
