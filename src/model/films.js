import Observer from "../utils/observer.js";

export default class FilmsModel extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setItems(items) {
    this._films = items.slice();
  }

  getItems() {
    return this._films;
  }
}
