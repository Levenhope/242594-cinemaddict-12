import AbstractView from "./abstract.js";
import {LANG} from "../lang.js";

export default class ProfileView extends AbstractView {
  getTemplate() {
    return (
      `<section class="header__profile profile">
        <p class="profile__rating">${LANG.RANK_SCI_FIGHTER}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
    );
  }
}
