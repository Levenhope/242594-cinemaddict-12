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
    const adaptedFilm = Object.assign(
      {},
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

    delete adaptedFilm.film_info.poster;
    delete adaptedFilm.film_info.title;
    delete adaptedFilm.film_info.alternative_title;
    delete adaptedFilm.film_info.total_rating;
    delete adaptedFilm.film_info.release.date;
    delete adaptedFilm.film_info.runtime;
    delete adaptedFilm.film_info.genre;
    delete adaptedFilm.film_info.description;
    delete adaptedFilm.film_info.director;
    delete adaptedFilm.film_info.writers;
    delete adaptedFilm.film_info.actors;
    delete adaptedFilm.film_info.release.release_country;
    delete adaptedFilm.film_info.age_rating;
    delete adaptedFilm.user_details.watchlist;
    delete adaptedFilm.user_details.already_watched;
    delete adaptedFilm.user_details.favorite;

    return adaptedFilm;
  }

  static adaptCommentToClient(comment) {
    const adaptedComment = Object.assign(
      {},
      comment,
      {
        id: comment.id,
        name: comment.author,
        date: new Date(comment.date),
        commentText: comment.comment,
        emoji: comment.emotion
      }
    );

    delete adaptedComment.author;
    delete adaptedComment.comment;
    delete adaptedComment.emotion;

    return adaptedComment;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        "id": film.id,
        "film_info.poster": film.poster,
        "film_info.title": film.title,
        "film_info.alternative_title": film.originalTitle,
        "film_info.total_rating": film.rating,
        "film_info.release.date": film.date.toISOString(),
        "film_info.runtime": film.duration,
        "film.film_info.genre": film.genres.split(' '),
        "film_info.description": film.description,
        "film_info.director": film.director,
        "film_info.writers": film.writers,
        "film_info.actors": film.actors,
        "film_info.release.release_country": film.country,
        "film_info.age_rating": film.age,
        "user_details.watchlist": film.isInWatchlist,
        "user_details.already_watched": film.isInHistory,
        "user_details.favorite": film.isInFavorites
      }
    );

    delete adaptedFilm.poster;
    delete adaptedFilm.title;
    delete adaptedFilm.originalTitle;
    delete adaptedFilm.rating;
    delete adaptedFilm.date;
    delete adaptedFilm.duration;
    delete adaptedFilm.genres;
    delete adaptedFilm.description;
    delete adaptedFilm.director;
    delete adaptedFilm.writers;
    delete adaptedFilm.actors;
    delete adaptedFilm.country;
    delete adaptedFilm.age;
    delete adaptedFilm.isInWatchlist;
    delete adaptedFilm.isInHistory;
    delete adaptedFilm.isInFavorites;

    return adaptedFilm;
  }
}
