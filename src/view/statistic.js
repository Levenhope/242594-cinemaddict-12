import SmartView from "./smart.js";
import {getMostWatchedGenre, getWatchedFilmsInDateRange, getWatchedFilmsDuration, getGenreStatistics} from "../utils/statistic.js";
import moment from "moment";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {STATISTICS_FILTERS} from "../const.js";

const renderGenresChart = (statisticCtx, films) => {
  const BAR_HEIGHT = 50;
  const genreStatistics = getGenreStatistics(films);

  statisticCtx.height = BAR_HEIGHT * Object.values(genreStatistics).length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(genreStatistics),
      datasets: [{
        data: Object.values(genreStatistics),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: 'start',
          align: 'start',
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

export default class StatisticView extends SmartView {
  constructor(filmsModel) {
    super();

    this._watchedFilms = filmsModel.getFilms().filter((film) => film.isInHistory);

    this._data = {
      watchedFilms: this._watchedFilms,
    };

    this._currentFilter = `all-time`;
    this._genresChart = null;
    this._periodChangeHandler = this._periodChangeHandler.bind(this);
    this._setFilterChangeHandler = this._setFilterChangeHandler.bind(this);

    this._setChart();
    this._initFilterChangeHandler();
  }

  getTemplate() {
    const {watchedFilms} = this._data;
    console.log(watchedFilms);
    return (
      `<section class="statistic">
        <p class="statistic__rank">
          Your rank
          <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">Sci-Fighter</span>
        </p>
    
        <form class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>
          ${STATISTICS_FILTERS.map((item) => `
            <input
              type="radio"
              class="statistic__filters-input visually-hidden"
              name="statistic-filter"
              id="statistic-${item.value}"
              value="${item.value}"
              ${item.value === this._currentFilter ? `checked` : ``}
            >
            <label for="statistic-${item.value}" class="statistic__filters-label">${item.name}</label>
          `).join(``)}
        </form>
    
        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text">${watchedFilms.length} <span class="statistic__item-description">movies</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text">
              ${moment.duration(getWatchedFilmsDuration(watchedFilms), "m").hours()} <span class="statistic__item-description">h</span> 
              ${moment.duration(getWatchedFilmsDuration(watchedFilms), "m").minutes()}<span class="statistic__item-description">m</span>
            </p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text">${getMostWatchedGenre(watchedFilms)}</p>
          </li>
        </ul>
    
        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>
    
      </section>`
    );
  }

  removeElement() {
    super.removeElement();

    if (this._genresChart !== null) {
      this._genresChart = null;
    }
  }

  restoreHandlers() {
    this._setChart();
    this._initFilterChangeHandler();
  }

  _setChart() {
    if (this._genresChart !== null) {
      this._genresChart = null;
    }
    const {watchedFilms} = this._data;

    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    this._genresChart = renderGenresChart(statisticCtx, watchedFilms);
  }

  _periodChangeHandler(watchedFilms) {
    this.updateData({
      watchedFilms
    });
  }

  _initFilterChangeHandler() {
    this._setFilterChangeHandler((filterItem) => {
      this._currentFilter = filterItem.value;
      this._periodChangeHandler(getWatchedFilmsInDateRange(this._watchedFilms, filterItem.value));
    });
  }

  _setFilterChangeHandler(callback) {
    for (let filterItem of this.getElement().querySelectorAll(`.statistic__filters-input`)) {
      filterItem.addEventListener(`change`, function () {
        callback(filterItem);
      });
    }
  }
}
