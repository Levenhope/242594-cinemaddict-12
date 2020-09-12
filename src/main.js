"use strict";

import ProfileView from "./view/profile.js";
import SortView from "./view/sort.js";
import FilmListsContainerView from "./view/lists-container.js";
import StatsView from "./view/stats.js";
import {generateFilm} from "./mock/film.js";
import {render} from "./utils/render.js";
import FilmListPresenter from "./presenter/film-list.js";
import NavigationPresenter from "./presenter/navigation.js";
import {FILMS_NUMBER_MAIN} from "./const.js";
import FilmsModel from "./model/films.js";

const films = new Array(FILMS_NUMBER_MAIN).fill().map(generateFilm);
const filmsModel = new FilmsModel();
filmsModel.setItems(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterStatsElement = document.querySelector(`.footer__statistics`);
const filmsContainerComponent = new FilmListsContainerView();

const navigationPresenter = new NavigationPresenter(films);
navigationPresenter.init(siteMainElement);

const filmListPresenter = new FilmListPresenter(filmsContainerComponent, filmsModel);
filmListPresenter.init();

render(siteHeaderElement, new ProfileView());
render(siteMainElement, new SortView());
render(siteMainElement, filmsContainerComponent);
render(siteFooterStatsElement, new StatsView(FILMS_NUMBER_MAIN));
