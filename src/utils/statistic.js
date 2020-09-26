import moment from "moment";

export const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return new Date(currentDate);
};

export const countWatchedFilmsInDateRange = (films, dateFrom = null) => {
  return films.reduce((counter, film) => {
    if (
      (dateFrom === null || moment(film.watchingDate).isSameOrAfter(dateFrom)) ||
      moment(film.watchingDate).isSameOrBefore(getCurrentDate())
    ) {
      return counter + 1;
    } else {
      return counter;
    }
  }, 0);
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
