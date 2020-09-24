import AbstractView from "./abstract.js";
import {LANG} from "../lang.js";

const createNoTaskTemplate = () => {
  return `<h2 class="films-list__title">${LANG.LOADING}</h2>`;
};

export default class LoadingView extends AbstractView {
  getTemplate() {
    return createNoTaskTemplate();
  }
}
