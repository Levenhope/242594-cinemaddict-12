"use strict";

import FooterStatisticView from "./view/footer-statistic.js";
import StatisticView from "./view/statistic.js";
import FilmListPresenter from "./presenter/film-list.js";
import NavigationPresenter from "./presenter/navigation.js";
import FilmsModel from "./model/films.js";
import NavigationModel from "./model/navigation.js";
import ProfileView from "./view/profile.js";
import {AUTHORIZATION, END_POINT, UpdateType} from "./const.js";
import {render, remove} from "./utils/render.js";
import Api from "./api.js";

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterStatsElement = document.querySelector(`.footer__statistics`);

const api = new Api(END_POINT, AUTHORIZATION);

let statisticComponent = null;
const filmsModel = new FilmsModel();
const profileComponent = new ProfileView();
const navigationModel = new NavigationModel();

render(siteHeaderElement, profileComponent);

const handleNavigationEvent = (menuItem) => {
  switch (menuItem) {
    case `statistic`:
      filmListPresenter.destroy();
      statisticComponent = new StatisticView(filmsModel);
      render(siteMainElement, statisticComponent);
      break;
    default:
      if(statisticComponent !== null) {
        remove(statisticComponent);
        statisticComponent = null;
        filmListPresenter.init();
      }
  }
};

const navigationPresenter = new NavigationPresenter(siteMainElement, navigationModel, filmsModel, handleNavigationEvent);
const filmListPresenter = new FilmListPresenter(siteMainElement, filmsModel, navigationModel, api, profileComponent);

navigationPresenter.init();
filmListPresenter.init();

api.getFilms().then((films) => {
  filmsModel.setFilms(UpdateType.INIT, films);
  render(siteFooterStatsElement, new FooterStatisticView(films.length));
}).catch(() => {
  filmsModel.setFilms(UpdateType.INIT, []);
});
