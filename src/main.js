"use strict";

import ProfileView from "./view/profile.js";
import NavigationView from "./view/navigation.js";
import SortView from "./view/sort.js";
import FilmListsContainerView from "./view/lists-container.js";
import StatsView from "./view/stats.js";
import {generateFilm} from "./mock/film.js";
import {generateNavigation} from "./mock/navigation.js";
import {render} from "./utils/render.js";
import FilmListPresenter from "./presenter/film-list.js";
import {FILMS_NUMBER_MAIN} from "./const.js";

const filmsMain = new Array(FILMS_NUMBER_MAIN).fill().map(generateFilm);
const navigation = generateNavigation(filmsMain);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterStatsElement = document.querySelector(`.footer__statistics`);
const filmsContainerComponent = new FilmListsContainerView();

render(siteHeaderElement, new ProfileView());
render(siteMainElement, new NavigationView(navigation));
render(siteMainElement, new SortView());
render(siteMainElement, filmsContainerComponent);

const filmListPresenter = new FilmListPresenter(filmsContainerComponent);

filmListPresenter.init(filmsMain);

render(siteFooterStatsElement, new StatsView(FILMS_NUMBER_MAIN));
