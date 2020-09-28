import AbstractView from "./abstract.js";
import {Lang} from "../lang.js";

export default class FooterStatisticView extends AbstractView {
  constructor(number) {
    super();
    this._number = number;
  }

  getTemplate() {
    return (
      `<p>${this._number} ${Lang.FILMS_STATS_MESSAGE}</p>`
    );
  }
}
