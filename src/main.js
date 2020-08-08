"use strict";

import {createProfileTemplate} from "./view/profile.js";
import {createNavigationTemplate} from "./view/navigation.js";
import {createSortTemplate} from "./view/sort.js";
import {createListsContainerTemplate} from "./view/list-container.js";
import {createListTemplate} from "./view/list.js";
import {createCardTemplate} from "./view/card.js";
import {createMoreButtonTemplate} from "./view/more-button.js";
import {createStatsTemplate} from "./view/stats.js";
import {createDetailsModalTemplate} from "./view/detail-modal.js";
import {getRandomInteger} from "./utils.js";
import {generateCard} from "./mock/card.js";

const CARDS_NUMBER_MAIN = getRandomInteger(0, 20);
const CARDS_NUMBER_PER_STEP = 5;
const CARDS_NUMBER_TOP_RATED = 2;
const CARDS_NUMBER_COMMENTED = 2;

const cardsMain = new Array(CARDS_NUMBER_MAIN).fill().map(generateCard);
const cardsTopRated = new Array(CARDS_NUMBER_TOP_RATED).fill().map(generateCard);
const cardsCommented = new Array(CARDS_NUMBER_COMMENTED).fill().map(generateCard);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteFooterStatsElement = document.querySelector(`.footer__statistics`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createProfileTemplate(), `beforeend`);
render(siteMainElement, createNavigationTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);

render(siteMainElement, createListsContainerTemplate(), `beforeend`);

const siteListsContainerElement = siteMainElement.querySelector(`.films`);

render(siteListsContainerElement, createListTemplate(false, `All movies. Upcoming`, `allfilms`), `beforeend`);
render(siteListsContainerElement, createListTemplate(true, `Top rated`, `toprated`), `beforeend`);
render(siteListsContainerElement, createListTemplate(true, `Most commented`, `commented`), `beforeend`);

const siteMainListElement = siteMainElement.querySelector(`#allfilms`);
const siteTopListElement = siteMainElement.querySelector(`#toprated`);
const siteCommentedListElement = siteMainElement.querySelector(`#commented`);

for (let i = 0; i < CARDS_NUMBER_MAIN; i++) {
  render(siteMainListElement, createCardTemplate(cardsMain[i]), `beforeend`);
}
render(siteMainListElement, createMoreButtonTemplate(), `afterend`);

for (let i = 0; i < CARDS_NUMBER_TOP_RATED; i++) {
  render(siteTopListElement, createCardTemplate(cardsTopRated[i]), `beforeend`);
}

for (let i = 0; i < CARDS_NUMBER_COMMENTED; i++) {
  render(siteCommentedListElement, createCardTemplate(cardsCommented[i]), `beforeend`);
}

render(siteFooterStatsElement, createStatsTemplate(), `beforeend`);
render(siteFooterElement, createDetailsModalTemplate(), `afterend`);
