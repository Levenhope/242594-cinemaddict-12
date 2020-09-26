"use strict";

import ProfileView from "./view/profile.js";
import FilmListsContainerView from "./view/lists-container.js";
import StatsView from "./view/stats.js";
import {render} from "./utils/render.js";
import FilmListPresenter from "./presenter/film-list.js";
import NavigationPresenter from "./presenter/navigation.js";
import {AUTHORIZATION, END_POINT, UPDATE_TYPE} from "./const.js";
import FilmsModel from "./model/films.js";
import NavigationModel from "./model/navigation.js";
import Api from "./api.js";


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterStatsElement = document.querySelector(`.footer__statistics`);

const api = new Api(END_POINT, AUTHORIZATION);

const filmsContainerComponent = new FilmListsContainerView();
const filmsModel = new FilmsModel();
const navigationModel = new NavigationModel();

const navigationPresenter = new NavigationPresenter(siteMainElement, navigationModel, filmsModel);
const filmListPresenter = new FilmListPresenter(siteMainElement, filmsContainerComponent, filmsModel, navigationModel, api);

navigationPresenter.init();
filmListPresenter.init();

render(siteHeaderElement, new ProfileView());
render(siteMainElement, filmsContainerComponent);

api.getFilms().then((films) => {
  filmsModel.setFilms(UPDATE_TYPE.INIT, films);
  render(siteFooterStatsElement, new StatsView(films.length));
}).catch(() => {
  filmsModel.setFilms(UPDATE_TYPE.INIT, []);
});
