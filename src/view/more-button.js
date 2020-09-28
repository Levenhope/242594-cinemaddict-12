import AbstractView from "./abstract.js";
import {Lang} from "../lang.js";

export default class MoreButtonView extends AbstractView {
  getTemplate() {
    return (
      `<button class="films-list__show-more">${Lang.SHOW_MORE}</button>`
    );
  }

  setClickHandler(callback) {
    this.getElement().addEventListener(`click`, function (e) {
      e.preventDefault();
      callback();
    });
  }
}

