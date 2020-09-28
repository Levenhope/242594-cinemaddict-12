import FilmsModel from "./model/films.js";
import CommentsModel from "./model/comments.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHttpsStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({uri: `movies`})
      .then(Api.toJSON)
      .then((films) => films.map(FilmsModel.adaptToClient));
  }

  getComments(filmId) {
    return this._load({uri: `comments/${filmId}`})
      .then(Api.toJSON)
      .then((comments) => comments.map(CommentsModel.adaptCommentToClient));
  }

  updateFilm(film) {
    return this._load({
      uri: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(FilmsModel.adaptToServer(film)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(FilmsModel.adaptToClient);
  }

  addComment(filmId, comment) {
    return this._load({
      uri: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(CommentsModel.adaptCommentToServer(comment)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(CommentsModel.adaptToClient);
  }

  deleteComment(commentId) {
    return this._load({
      uri: `comments/${commentId}`,
      method: Method.DELETE
    });
  }

  _load({
          uri,
          method = Method.GET,
          body = null,
          headers = new Headers()
        }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
      `${this._endPoint}/${uri}`,
      {method, body, headers}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHttpsStatusRange.MIN &&
      response.status > SuccessHttpsStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
