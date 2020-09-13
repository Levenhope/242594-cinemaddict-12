import Observer from "../utils/observer.js";
import {CATEGORIES} from "../const.js";

export default class NavigationModel extends Observer {
  constructor() {
    super();
    this._activeCategory = CATEGORIES.ALL;
  }

  setFilter(updateType, category) {
    this._activeCategory = category;
    this._notify(updateType, category);
  }

  getFilter() {
    return this._activeCategory;
  }
}