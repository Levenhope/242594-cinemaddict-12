import AbstractView from "./abstract.js";
import {Lang} from "../lang.js";

export default class LoadingView extends AbstractView {
  getTemplate() {
    return `<h2 class="films-list__title">${Lang.LOADING}</h2>`;
  }
}
