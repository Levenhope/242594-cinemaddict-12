import moment from "moment";
import {Rank} from "../const.js";

export const getWatchedFilmsInDateRange = (films, period = `all-time`) => {
  let dateFrom;
  switch (period) {
    case `all-time`:
      return films;
    case `today`:
      dateFrom = moment().startOf(`day`);
      return films.filter((film) => moment(film.watchingDate).isSameOrAfter(dateFrom));
    default:
      dateFrom = moment().subtract(1, period);
      return films.filter((film) => moment(film.watchingDate).isSameOrAfter(dateFrom));
  }
};

export const getWatchedFilmsDuration = (films) => {
  return films.reduce((totalDuration, film) => {
    return totalDuration + film.duration;
  }, 0);
};

export const getMostWatchedGenre = (films) => {
  const genreStatistics = getGenreStatistics(films);
  let mostWatchedViews = 0;
  let mostWatchedGenre = ``;

  for (let genre in genreStatistics) {
    if (genreStatistics[genre] > mostWatchedViews) {
      mostWatchedViews = genreStatistics[genre];
      mostWatchedGenre = genre;
    }
  }

  return mostWatchedGenre;
};

export const getGenreStatistics = (films) => {
  let genreStatistics = {};

  const userFilmsGenres = films.reduce((allGenres, film) => {
    for (let genre of film.genres) {
      allGenres.push(genre);
    }
    return allGenres;
  }, []);

  userFilmsGenres.map((genre) => {
    genreStatistics[genre] = (genreStatistics[genre] || 0) + 1;
  });

  return genreStatistics;
};

export const getRatingTitle = (watchedFilmsNumber) => {
  let rankTitle = ``;

  if (watchedFilmsNumber > 0 && watchedFilmsNumber < 11) {
    rankTitle = Rank.NOVICE;
  } else if (watchedFilmsNumber > 10 && watchedFilmsNumber < 21) {
    rankTitle = Rank.FAN;
  } else if (watchedFilmsNumber > 20) {
    rankTitle = Rank.MOVIE_BUFF;
  }

  return rankTitle;
};
