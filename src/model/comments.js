import Observer from "../utils/observer.js";

export default class CommentsModel extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(updateType, comments) {
    this._comments = comments.slice();
    this._notify(updateType);
  }

  getComments() {
    return this._comments;
  }

  static adaptCommentToClient(comment) {
    return {
      id: comment.id,
      name: comment.author,
      date: new Date(comment.date),
      commentText: comment.comment,
      emoji: comment.emotion
    };
  }

  static adaptCommentToServer(comment) {
    return {
      date: comment.date.toISOString(),
      comment: comment.commentText,
      emotion: comment.emoji
    };
  }
}
