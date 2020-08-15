"use strict";

import ProfileView from "./view/profile.js";
import NavigationView from "./view/navigation.js";
import SortView from "./view/sort.js";
import FilmListsContainerView from "./view/lists-container.js";
import FilmListView from "./view/list.js";
import CardView from "./view/film.js";
import MoreButtonView from "./view/more-button.js";
import StatsView from "./view/stats.js";
import DetailModalView from "./view/detail-modal.js";
import CommentItemView from "./view/comment.js";
import CommentsView from "./view/comments.js";
import {generateFilm} from "./mock/film.js";
import {generateComment} from "./mock/comment.js";
import {generateNavigation} from "./mock/navigation.js";
import {renderElement} from "./utils.js";

const FILMS_NUMBER_MAIN = 17;
const FILMS_NUMBER_PER_STEP = 5;
const FILMS_NUMBER_TOP_RATED = 2;
const FILMS_NUMBER_COMMENTED = 2;

const filmsMain = new Array(FILMS_NUMBER_MAIN).fill().map(generateFilm);
const filmsTopRated = new Array(FILMS_NUMBER_TOP_RATED).fill().map(generateFilm);
const filmsCommented = new Array(FILMS_NUMBER_COMMENTED).fill().map(generateFilm);
const navigation = generateNavigation(filmsMain);

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteFooterStatsElement = siteBodyElement.querySelector(`.footer__statistics`);

renderElement(siteHeaderElement, new ProfileView().getElement());
renderElement(siteMainElement, new NavigationView(navigation).getElement());
renderElement(siteMainElement, new SortView().getElement());
renderElement(siteMainElement, new FilmListsContainerView().getElement());

const siteListsContainerElement = siteMainElement.querySelector(`.films`);

renderElement(siteListsContainerElement, new FilmListView(false, `All movies. Upcoming`, `allfilms`).getElement());
renderElement(siteListsContainerElement, new FilmListView(true, `Top rated`, `toprated`).getElement());
renderElement(siteListsContainerElement, new FilmListView(true, `Most commented`, `commented`).getElement());

const siteMainListsContainerElement = siteMainElement.querySelector(`.films-list`);
const siteMainListElement = siteMainElement.querySelector(`#allfilms`);
const siteTopListElement = siteMainElement.querySelector(`#toprated`);
const siteCommentedListElement = siteMainElement.querySelector(`#commented`);

const renderCard = (place, film) => {
  const cardComponent = new CardView(film);
  const cardClickables = cardComponent.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`);
  const detailModalComponent = new DetailModalView(film);
  const siteDetailModalBottomElement = detailModalComponent.getElement().querySelector(`.form-details__bottom-container`);

  renderElement(siteDetailModalBottomElement, new CommentsView(film.commentsNumber).getElement());

  const siteDetailModalCommentsListElement = detailModalComponent.getElement().querySelector(`.film-details__comments-list`);

  const filmComments = new Array(film.commentsNumber).fill().map(generateComment);

  for (let i = 0; i < film.commentsNumber; i++) {
    renderElement(siteDetailModalCommentsListElement, new CommentItemView(filmComments[i]).getElement());
  }

  const openModal = () => {
    siteBodyElement.appendChild(detailModalComponent.getElement());
  };

  const closeModal = () => {
    siteBodyElement.removeChild(detailModalComponent.getElement());
  };

  for (let cardClickable of cardClickables) {
    cardClickable.addEventListener(`click`, () => {
      openModal();
    });
  }

  detailModalComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    closeModal();
  });

  renderElement(place, cardComponent.getElement());
};

for (let i = 0; i < Math.min(filmsMain.length, FILMS_NUMBER_PER_STEP); i++) {
  renderCard(siteMainListElement, filmsMain[i]);
}

if (filmsMain.length > FILMS_NUMBER_PER_STEP) {
  let renderedCardsCount = FILMS_NUMBER_PER_STEP;

  renderElement(siteMainListsContainerElement, new MoreButtonView().getElement());

  const moreButton = siteMainListsContainerElement.querySelector(`.films-list__show-more`);

  moreButton.addEventListener(`click`, (e) => {
    e.preventDefault();
    filmsMain
      .slice(renderedCardsCount, renderedCardsCount + FILMS_NUMBER_PER_STEP)
      .forEach((film) => renderElement(siteMainListElement, new CardView(film).getElement()));

    renderedCardsCount += FILMS_NUMBER_PER_STEP;

    if (renderedCardsCount >= filmsMain.length) {
      moreButton.remove();
    }
  });
}

for (let i = 0; i < FILMS_NUMBER_TOP_RATED; i++) {
  renderCard(siteTopListElement, filmsTopRated[i]);
}

for (let i = 0; i < FILMS_NUMBER_COMMENTED; i++) {
  renderCard(siteCommentedListElement, filmsCommented[i]);
}

renderElement(siteFooterStatsElement, new StatsView(FILMS_NUMBER_MAIN).getElement());
