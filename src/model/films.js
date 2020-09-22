import Observer from "../utils/observer.js";

export default class FilmsModel extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();
    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  static adaptToClient(film) {
    console.log(film);
    const adaptedFilm = Object.assign(
        film,
        {
          id: film.id,
          poster: film.film_info.poster,
          title: film.film_info.title,
          originalTitle: film.film_info.alternative_title,
          rating: film.film_info.total_rating,
          date: new Date(film.film_info.release.date),
          duration: film.film_info.runtime,
          genres: film.film_info.genre,
          description: film.film_info.description,
          director: film.film_info.director,
          writers: film.film_info.writers,
          actors: film.film_info.actors,
          country: film.film_info.release.release_country,
          age: film.film_info.age_rating,
          isInWatchlist: film.user_details.watchlist,
          isInHistory: film.user_details.already_watched,
          isInFavorites: film.user_details.favorite
        }
    );

    delete adaptedFilm.user_details.watchlist;
    delete adaptedFilm.user_details.already_watched;
    delete adaptedFilm.user_details.favorite;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
        film,
        {
          user_details: {
            watchlist: film.isInWatchlist,
            already_watched: film.isInHistory,
            favorite: film.isInFavorites
          }
        }
    );

    delete adaptedFilm.isInWatchlist;
    delete adaptedFilm.isInHistory;
    delete adaptedFilm.isInFavorites;

    return adaptedFilm;
  }
}
