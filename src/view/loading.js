import AbstractView from "./abstract.js";
import {LANG} from "../lang.js";

export default class LoadingView extends AbstractView {
  getTemplate() {
    return `<h2 class="films-list__title">${LANG.LOADING}</h2>`;
  }
}
