import AbstractView from "./abstract.js";
import {LANG} from "../lang.js";

export default class StatsView extends AbstractView {
  constructor(number) {
    super();
    this._number = number;
  }

  getTemplate() {
    return (
      `<p>${this._number} ${LANG.FILMS_STATS_MESSAGE}</p>`
    );
  }
}
