export const createCardTemplate = (film) => {
  const {poster, title, rating, year, duration, genres, description, comments} = film;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${year}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genres[0]}</span>
        </p>
        <img src="${poster}" alt="" class="film-card__poster" onclick="document.querySelector('.film-details').classList.remove('visually-hidden')">
        <p class="film-card__description">${description.length > 140 ? description.substring(0, 140) + `...` : description}</p>
        <a class="film-card__comments">${comments} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
    </article>`
  );
};
