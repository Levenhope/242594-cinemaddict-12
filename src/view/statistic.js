import moment from "moment";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import SmartView from "./smart.js";
import {getMostWatchedGenre, getWatchedFilmsInDateRange, getWatchedFilmsDuration, getGenreStatistics, getRatingTitle} from "../utils/statistic.js";
import {StatisticsFilters} from "../const.js";
import {Lang} from "../lang.js";

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
          anchor: `start`,
          align: `start`,
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
      watchedFilms: this._watchedFilms
    };

    this._rankTitle = ``;
    this._currentFilter = `all-time`;
    this._genresChart = null;
    this._handlePeriodChange = this._handlePeriodChange.bind(this);

    this._setChart();
    this._initFilterChangeHandler();
  }

  getTemplate() {
    const {watchedFilms} = this._data;
    return (
      `<section class="statistic">
        <p class="statistic__rank">
          ${Lang.YOUR_RANK}
          <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">${this._rankTitle}</span>
        </p>
    
        <form class="statistic__filters" action="" method="get">
          <p class="statistic__filters-description">${Lang.SHOW_STATS}:</p>
            ${StatisticsFilters.map((filter) => `
              <input
                type="radio"
                class="statistic__filters-input visually-hidden"
                name="statistic-filter"
                id="statistic-${filter.value}"
                value="${filter.value}"
                ${filter.value === this._currentFilter ? `checked` : ``}
              >
              <label for="statistic-${filter.value}" class="statistic__filters-label">${filter.name}</label>
            `).join(``)}
        </form>
    
        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">${Lang.YOU_WATCHED}</h4>
            <p class="statistic__item-text">${watchedFilms.length} <span class="statistic__item-description">${Lang.MOVIES}</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">${Lang.TOTAL_DURATION}</h4>
            <p class="statistic__item-text">
              ${moment.duration(getWatchedFilmsDuration(watchedFilms), `m`).hours()} <span class="statistic__item-description">${Lang.HOURS_SHORT}</span> 
              ${moment.duration(getWatchedFilmsDuration(watchedFilms), `m`).minutes()}<span class="statistic__item-description">${Lang.MINUTES_SHORT}</span>
            </p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">${Lang.TOP_GENRE}</h4>
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

    this._rankTitle = getRatingTitle(this._watchedFilms.length);
    const {watchedFilms} = this._data;

    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    this._genresChart = renderGenresChart(statisticCtx, watchedFilms);
  }

  _setFilterChangeHandler(callback) {
    for (let filterItem of this.getElement().querySelectorAll(`.statistic__filters-input`)) {
      filterItem.addEventListener(`change`, function () {
        callback(filterItem);
      });
    }
  }

  _initFilterChangeHandler() {
    this._setFilterChangeHandler((filterItem) => {
      this._currentFilter = filterItem.value;
      this._handlePeriodChange(getWatchedFilmsInDateRange(this._watchedFilms, filterItem.value));
    });
  }

  _handlePeriodChange(watchedFilms) {
    this.updateData({
      watchedFilms
    });
  }
}
