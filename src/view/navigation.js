import AbstractView from "./abstract.js";
import {LANG} from "../lang.js";

const createNavigationItemTemplate = (navigation, isActive) => {
  const {title, number, id} = navigation;
  return (
    `<a href="#${id}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">
      ${title}
      ${number !== 0 && id !== `all` ? `<span class="main-navigation__item-count">${number}</span>` : ``}
    </a>`
  );
};

export default class NavigationView extends AbstractView {
  constructor(navigationItems) {
    super();
    this._navigationItems = navigationItems;
  }
  getTemplate() {
    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
          ${this._navigationItems.map((navItem, index) => createNavigationItemTemplate(navItem, index === 0)).join(``)}
        </div>
        <a href="#stats" class="main-navigation__additional">${LANG.STATS}</a>
      </nav>`
    );
  }


}
