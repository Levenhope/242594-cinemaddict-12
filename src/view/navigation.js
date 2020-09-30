import AbstractView from "./abstract.js";
import {Lang} from "../lang.js";

export default class NavigationView extends AbstractView {
  constructor(navigationItems, currentFilterType) {
    super();
    this._navigationItems = navigationItems;
    this._currentFilter = currentFilterType;

    this._statisticButton = this.getElement().querySelector(`.main-navigation__additional`);
    this._commonItems = this.getElement().querySelectorAll(`.main-navigation__item`);

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._statisticButtonClickHandler = this._statisticButtonClickHandler.bind(this);
  }

  getTemplate() {
    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
          ${this._navigationItems.map((navigationItem) => this._getNavigationItemTemplate(navigationItem, navigationItem.id === this._currentFilter)).join(``)}
        </div>
        <a href="#stats" data-target="statistic" class="main-navigation__additional">${Lang.STATS}</a>
      </nav>`
    );
  }

  _getNavigationItemTemplate(navigationItem, isActive) {
    const {title, number, id} = navigationItem;
    return (
      `<a href="#${id}" data-target="${id}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">
      ${title}
      ${number !== 0 && id !== `all` ? `<span class="main-navigation__item-count">${number}</span>` : ``}
    </a>`
    );
  }

  _filterTypeChangeHandler(e) {
    this._statisticButton.classList.remove(`main-navigation__item--active`);
    this._callback.filterType(e.target.closest(`.main-navigation__item`).dataset.target);
  }

  _statisticButtonClickHandler() {
    this._commonItems.forEach((navigationItem) => navigationItem.classList.remove(`main-navigation__item--active`));
    this._statisticButton.classList.add(`main-navigation__item--active`);
    this._callback.statistic(this._statisticButton.dataset.target);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterType = callback;
    this._commonItems.forEach((navigationItem) => navigationItem.addEventListener(`click`, this._filterTypeChangeHandler));
  }

  setStatisticButtonClickHandler(callback) {
    this._callback.statistic = callback;
    this._statisticButton.addEventListener(`click`, this._statisticButtonClickHandler);
  }

  removeEventHandlers() {
    this._commonItems.forEach((navigationItem) => navigationItem.removeEventListener(`click`, this._filterTypeChangeHandler));
    this._statisticButton.removeEventListener(`click`, this._statisticButtonClickHandler);
  }
}
