import AbstractView from "./abstract.js";
import {LANG} from "../lang.js";

export default class MoreButtonView extends AbstractView {
  getTemplate() {
    return (
      `<button class="films-list__show-more">${LANG.SHOW_MORE}</button>`
    );
  }
}

