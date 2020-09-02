import AbstractView from "../view/abstract.js";

export const RenderPosition = {
  afterBegin: `afterbegin`,
  beforeEnd: `beforeend`
};

export const render = (container, element, place = RenderPosition.beforeEnd) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (element instanceof AbstractView) {
    element = element.getElement();
  }

  switch (place) {
    case RenderPosition.afterBegin:
      container.prepend(element);
      break;
    case RenderPosition.beforeEnd:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};

export const remove = (component) => {
  if (!(component instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};
