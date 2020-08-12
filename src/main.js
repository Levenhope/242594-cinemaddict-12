"use strict";

import {createProfileTemplate} from "./view/profile.js";
import {createNavigationTemplate} from "./view/navigation.js";
import {createSortTemplate} from "./view/sort.js";
import {createListsContainerTemplate} from "./view/list-container.js";
import {createListTemplate} from "./view/list.js";
import {createCardTemplate} from "./view/film.js";
import {createMoreButtonTemplate} from "./view/more-button.js";
import {createStatsTemplate} from "./view/stats.js";
import {createDetailsModalTemplate} from "./view/detail-modal.js";
import {generateFilm} from "./mock/film.js";
import {generateComment} from "./mock/comment.js";
import {createEmptyListTemplate} from "./view/empty-list.js";
import {generateNavigation} from "./mock/navigation.js";
import {generateCommentItemTemplate} from "./view/comment.js";
import {generateCommentsTemplate} from "./view/comments.js";

const FILMS_NUMBER_MAIN = 17;
const FILMS_NUMBER_PER_STEP = 5;
const FILMS_NUMBER_TOP_RATED = 2;
const FILMS_NUMBER_COMMENTED = 2;
const FILM_COMMENTS_NUMBER = 7;

const filmsMain = new Array(FILMS_NUMBER_MAIN).fill().map(generateFilm);
const filmsTopRated = new Array(FILMS_NUMBER_TOP_RATED).fill().map(generateFilm);
const filmsCommented = new Array(FILMS_NUMBER_COMMENTED).fill().map(generateFilm);
const filmComments = new Array(FILM_COMMENTS_NUMBER).fill().map(generateComment);
const navigation = generateNavigation(filmsMain);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteFooterStatsElement = document.querySelector(`.footer__statistics`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createProfileTemplate(), `beforeend`);
render(siteMainElement, createNavigationTemplate(navigation), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);

render(siteMainElement, createListsContainerTemplate(), `beforeend`);

const siteListsContainerElement = siteMainElement.querySelector(`.films`);

if (FILMS_NUMBER_MAIN > 0) {
  render(siteListsContainerElement, createListTemplate(false, `All movies. Upcoming`, `allfilms`), `beforeend`);
  render(siteListsContainerElement, createListTemplate(true, `Top rated`, `toprated`), `beforeend`);
  render(siteListsContainerElement, createListTemplate(true, `Most commented`, `commented`), `beforeend`);

  const siteMainListElement = siteMainElement.querySelector(`#allfilms`);
  const siteTopListElement = siteMainElement.querySelector(`#toprated`);
  const siteCommentedListElement = siteMainElement.querySelector(`#commented`);


  render(siteFooterElement, createDetailsModalTemplate(filmsMain[0]), `afterend`);

  const siteDetailModalBottomElement = document.querySelector(`.form-details__bottom-container`);

  render(siteDetailModalBottomElement, generateCommentsTemplate(FILM_COMMENTS_NUMBER), `beforeend`);

  const siteDetailModalCommentsListElement = siteDetailModalBottomElement.querySelector(`.film-details__comments-list`);

  for (let i = 0; i < FILM_COMMENTS_NUMBER; i++) {
    render(siteDetailModalCommentsListElement, generateCommentItemTemplate(filmComments[i]), `beforeend`);
  }

  for (let i = 0; i < Math.min(filmsMain.length, FILMS_NUMBER_PER_STEP); i++) {
    if (i === 0) {
      filmsMain[i].commentsNumber = FILM_COMMENTS_NUMBER;
    }
    render(siteMainListElement, createCardTemplate(filmsMain[i]), `beforeend`);
  }
  if (filmsMain.length > FILMS_NUMBER_PER_STEP) {
    let renderedCardsCount = FILMS_NUMBER_PER_STEP;

    render(siteMainListElement, createMoreButtonTemplate(), `afterend`);

    const moreButton = siteListsContainerElement.querySelector(`.films-list__show-more`);

    moreButton.addEventListener(`click`, (e) => {
      e.preventDefault();
      filmsMain
        .slice(renderedCardsCount, renderedCardsCount + FILMS_NUMBER_PER_STEP)
        .forEach((film) => render(siteMainListElement, createCardTemplate(film), `beforeend`));

      renderedCardsCount += FILMS_NUMBER_PER_STEP;

      if (renderedCardsCount >= filmsMain.length) {
        moreButton.remove();
      }
    });
  }

  for (let i = 0; i < FILMS_NUMBER_TOP_RATED; i++) {
    render(siteTopListElement, createCardTemplate(filmsTopRated[i]), `beforeend`);
  }

  for (let i = 0; i < FILMS_NUMBER_COMMENTED; i++) {
    render(siteCommentedListElement, createCardTemplate(filmsCommented[i]), `beforeend`);
  }
} else {
  render(siteListsContainerElement, createEmptyListTemplate(), `beforeend`);
}

render(siteFooterStatsElement, createStatsTemplate(FILMS_NUMBER_MAIN), `beforeend`);
