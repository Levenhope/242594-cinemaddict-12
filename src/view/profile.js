import AbstractView from "./abstract.js";
import {getRatingTitle} from "../utils/statistic.js";

export default class ProfileView extends AbstractView {
  getTemplate() {
    return (
      `<section class="header__profile profile">
        <p class="profile__rating"></p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
    );
  }

  printRankTitle(films) {
    const rankTitleElement = this.getElement().querySelector(`.profile__rating`);
    const watchedFilmsNumber = films.filter((film) => film.isInHistory).length;

    rankTitleElement.textContent = getRatingTitle(watchedFilmsNumber);
  }
}
