export const createListTemplate = (isExtraList, title, id) => {
  return (
    `<section class="${isExtraList ? `films-list--extra` : `films-list` }">
      <h2 class="films-list__title ${!isExtraList ? `visually-hidden` : ``}">${title}</h2>
      <div class="films-list__container" id="${id}"></div>
    </section>`
  );
};
