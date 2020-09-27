import moment from "moment";

export const getWatchedFilmsInDateRange = (films, period) => {
  let dateFrom;
  switch (period) {
    case `all-time`:
      return films;
    case `today`:
      dateFrom = moment().startOf('day');
      return films.filter((film) => moment(film.watchingDate).isSameOrAfter(dateFrom));
    default:
      dateFrom = moment().subtract(1, period);
      return films.filter((film) => moment(film.watchingDate).isSameOrAfter(dateFrom));
  }
};

export const getWatchedFilmsDuration = (films) => {
  return films.reduce((total, item) => {return total + item.duration}, 0);
};

export const getMostWatchedGenre = (films) => {
  let genreStatistics = getGenreStatistics(films);
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

  const userFilmsGenres = films.reduce((allGenres, item) => {
    for(let genre of item.genres) {
      allGenres.push(genre);
    }
    return allGenres;
  }, []);

  userFilmsGenres.forEach((genre) => {
    return genreStatistics[genre] = ( genreStatistics[genre] || 0 ) + 1;
  });

  return genreStatistics;
};
