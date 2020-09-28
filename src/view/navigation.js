import AbstractView from "./abstract.js";
import {Lang} from "../lang.js";

export default class NavigationView extends AbstractView {
  constructor(navigationItems, currentFilterType) {
    super();
    this._navigationItems = navigationItems;
    this._currentFilter = currentFilterType;
  }

  getTemplate() {
    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
          ${this._navigationItems.map((navItem) => this._getNavigationItemTemplate(navItem, navItem.id === this._currentFilter)).join(``)}
        </div>
        <a href="#stats" data-nav="statistic" class="main-navigation__additional">${Lang.STATS}</a>
      </nav>`
    );
  }

  _getNavigationItemTemplate(navigation, isActive) {
    const {title, number, id} = navigation;
    return (
      `<a href="#${id}" data-nav="${id}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">
      ${title}
      ${number !== 0 && id !== `all` ? `<span class="main-navigation__item-count">${number}</span>` : ``}
    </a>`
    );
  }

  setFilterTypeChangeHandler(callback) {
    const statisticButton = this.getElement().querySelector(`.main-navigation__additional`);
    const commonItems = this.getElement().querySelectorAll(`.main-navigation__item`);
    commonItems.forEach((navItem) => {
      navItem.addEventListener(`click`, function () {
        statisticButton.classList.remove(`main-navigation__item--active`);
        callback(navItem.getAttribute(`data-nav`));
      });
    });
  }

  setStatisticButtonClickHandler(callback) {
    const statisticButton = this.getElement().querySelector(`.main-navigation__additional`);
    const commonItems = this.getElement().querySelectorAll(`.main-navigation__item`);
    statisticButton.addEventListener(`click`, function () {
      commonItems.forEach((navItem) => navItem.classList.remove(`main-navigation__item--active`));
      statisticButton.classList.add(`main-navigation__item--active`);
      callback(statisticButton.getAttribute(`data-nav`));
    });
  }
}
