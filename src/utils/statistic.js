import moment from "moment";
import {Rank} from "../const.js";

export const getWatchedFilmsInDateRange = (films, period = `all-time`) => {
  let dateFrom = moment().subtract(1, period);

  switch (period) {
    case `all-time`:
      return films;
    case `today`:
      dateFrom = moment().startOf(`day`);
  }

  return films.filter((film) => moment(film.watchingDate).isSameOrAfter(dateFrom));
};

export const getWatchedFilmsDuration = (films) => {
  return films.reduce((totalDuration, film) => {
    return totalDuration + film.duration;
  }, 0);
};

export const getMostWatchedGenre = (films) => {
  const genreStatistics = getGenreStatistics(films);

  return Object.keys(genreStatistics).reduce((mostWatchedGenre, genre) =>
    genreStatistics[mostWatchedGenre] > genreStatistics[genre] ? mostWatchedGenre : genre
  );
};

export const getGenreStatistics = (films) => {
  const genreStatistics = {};

  films.reduce((allGenres, film) => {
    allGenres.push(...film.genres);
    return allGenres;
  }, []).map((genre) => {
    genreStatistics[genre] = (genreStatistics[genre] || 0) + 1;
  });

  return genreStatistics;
};

export const getRatingTitle = (watchedFilmsNumber) => {
  if (watchedFilmsNumber > 0 && watchedFilmsNumber < 11) {
    return Rank.NOVICE;
  } else if (watchedFilmsNumber > 10 && watchedFilmsNumber < 21) {
    return Rank.FAN;
  } else if (watchedFilmsNumber > 20) {
    return Rank.MOVIE_BUFF;
  } else {
    return ``;
  }
};
