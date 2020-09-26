import AbstractView from "./abstract.js";
import moment from "moment";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default class StatisticView extends AbstractView {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;

    this._userFilms = this._filmsModel.filter((film) => film.isInHistory);
    this._totalDuration = this._userFilms.reduce((total, item) => {return total + item.duration}, 0);
    this._topGenre = this._getMostWatchedGenre();
  }

  getTemplate() {
    return (
      `<section class="statistic">
        <p class="statistic__rank">
          Your rank
          <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">Sci-Fighter</span>
        </p>
    
        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>
    
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
          <label for="statistic-all-time" class="statistic__filters-label">All time</label>
    
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
          <label for="statistic-today" class="statistic__filters-label">Today</label>
    
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
          <label for="statistic-week" class="statistic__filters-label">Week</label>
    
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
          <label for="statistic-month" class="statistic__filters-label">Month</label>
    
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
          <label for="statistic-year" class="statistic__filters-label">Year</label>
        </form>
    
        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text">${this._userFilms.length} <span class="statistic__item-description">movies</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text">${moment.duration(this._totalDuration, "minutes").hours()} <span class="statistic__item-description">h</span> ${moment.duration(this._totalDuration, "minutes").minutes()}<span class="statistic__item-description">m</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text">${this._topGenre}</p>
          </li>
        </ul>
    
        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>
    
      </section>`
    );
  }

  _getMostWatchedGenre() {
    let genreStatistics = {};
    let mostWatchedViews = 0;
    let mostWatchedGenre = ``;

    const userFilmsGenres = this._userFilms.reduce((allGenres, item) => {
      for(let genre of item.genres) {
        allGenres.push(genre);
      }
      return allGenres;
    }, []);

    userFilmsGenres.forEach((genre) => {
      return genreStatistics[genre] = ( genreStatistics[genre] || 0 ) + 1;
    });

    for (let genre in genreStatistics) {
      if (genreStatistics[genre] > mostWatchedViews) {
        mostWatchedViews = genreStatistics[genre];
        mostWatchedGenre = genre;
      }
    }

   return mostWatchedGenre;
  }
}
