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
import {render, remove} from "./utils/render.js";
import {LANG} from "./lang.js";

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

render(siteHeaderElement, new ProfileView());
render(siteMainElement, new NavigationView(navigation));
render(siteMainElement, new SortView());
render(siteMainElement, new FilmListsContainerView());

const siteListsContainerElement = siteMainElement.querySelector(`.films`);

render(siteListsContainerElement, new FilmListView(false, LANG.ALL_MOVIES_TITLE, `allfilms`));
render(siteListsContainerElement, new FilmListView(true, LANG.TOP_RATED_TITLE, `toprated`));
render(siteListsContainerElement, new FilmListView(true, LANG.MOST_COMMENTED, `commented`));

const siteMainListsContainerElement = siteMainElement.querySelector(`.films-list`);
const siteMainListElement = siteMainElement.querySelector(`#allfilms`);
const siteTopListElement = siteMainElement.querySelector(`#toprated`);
const siteCommentedListElement = siteMainElement.querySelector(`#commented`);

const renderCard = (place, film) => {
  const cardComponent = new CardView(film);
  const detailModalComponent = new DetailModalView(film);
  const siteDetailModalBottomElement = detailModalComponent.getElement().querySelector(`.form-details__bottom-container`);

  render(siteDetailModalBottomElement, new CommentsView(film.commentsNumber));

  const siteDetailModalCommentsListElement = detailModalComponent.getElement().querySelector(`.film-details__comments-list`);

  const filmComments = new Array(film.commentsNumber).fill().map(generateComment);

  for (let i = 0; i < film.commentsNumber; i++) {
    render(siteDetailModalCommentsListElement, new CommentItemView(filmComments[i]));
  }

  cardComponent.setInnerElementsClickHandler(() => {
    siteBodyElement.appendChild(detailModalComponent.getElement());
  });

  detailModalComponent.setCloseButtonClickHandler(() => {
    siteBodyElement.removeChild(detailModalComponent.getElement());
  });

  render(place, cardComponent);
};

for (let i = 0; i < Math.min(filmsMain.length, FILMS_NUMBER_PER_STEP); i++) {
  renderCard(siteMainListElement, filmsMain[i]);
}

if (filmsMain.length > FILMS_NUMBER_PER_STEP) {
  let renderedCardsCount = FILMS_NUMBER_PER_STEP;

  const moreButtonComponent = new MoreButtonView();

  render(siteMainListsContainerElement, moreButtonComponent);

  moreButtonComponent.setClickHandler(() => {
    filmsMain
      .slice(renderedCardsCount, renderedCardsCount + FILMS_NUMBER_PER_STEP)
      .forEach((film) => render(siteMainListElement, new CardView(film)));

    renderedCardsCount += FILMS_NUMBER_PER_STEP;

    if (renderedCardsCount >= filmsMain.length) {
      remove(moreButtonComponent);
    }
  });
}

for (let i = 0; i < FILMS_NUMBER_TOP_RATED; i++) {
  renderCard(siteTopListElement, filmsTopRated[i]);
}

for (let i = 0; i < FILMS_NUMBER_COMMENTED; i++) {
  renderCard(siteCommentedListElement, filmsCommented[i]);
}

render(siteFooterStatsElement, new StatsView(FILMS_NUMBER_MAIN));
