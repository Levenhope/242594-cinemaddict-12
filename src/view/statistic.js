import SmartView from "./smart.js";
import {getMostWatchedGenre, countWatchedFilmsInDateRange, getCurrentDate, getGenreStatistics} from "../utils/statistic.js";
import moment from "moment";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const renderGenresChart = (statisticCtx, films, dateFrom) => {
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
  constructor(films) {
    super();

    this._data = {
      films,
      dateFrom: null,
      dateTo: getCurrentDate()
    };
    this._genresChart = null;
    this._dateChangeHandler = this._dateChangeHandler.bind(this);
    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._genresChart !== null) {
      this._genresChart = null;
    }
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._genresChart !== null) {
      this._genresChart = null;
    }

    const {films, dateFrom} = this._data;
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    this._genresChart = renderGenresChart(statisticCtx, films, dateFrom);
  }

  _dateChangeHandler(dateFrom) {
    if (!dateFrom) {
      return;
    }

    this.updateData({
      dateFrom
    });
  }

  getTemplate() {
    const userFilms = this._data.films.filter((film) => film.isInHistory);
    const userWatchedFilmsDuration = userFilms.reduce((total, item) => {return total + item.duration}, 0);

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
            <p class="statistic__item-text">${userFilms.length} <span class="statistic__item-description">movies</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text">${moment.duration(userWatchedFilmsDuration, "m").hours()} <span class="statistic__item-description">h</span> ${moment.duration(userWatchedFilmsDuration, "m").minutes()}<span class="statistic__item-description">m</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text">${getMostWatchedGenre(userFilms)}</p>
          </li>
        </ul>
    
        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>
    
      </section>`
    );
  }
}
