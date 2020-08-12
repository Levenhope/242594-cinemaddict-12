import {DESPRIPTION} from "./const";

export const getFullYear = (date) => {
  return date.getFullYear();
};

export const getReadableDate = (date) => {
  const formattedDate = new Intl.DateTimeFormat(`en-US`, {day: `numeric`, month: `long`, year: `numeric`});
  const [{value: month}, , {value: day}, , {value: year}] = formattedDate.formatToParts(date);
  return (`${day} ${month} ${year}`);
};

export const getRandomDate = (start, end = new Date()) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const getRandomText = (min = 1, max = 1) => {
  const sentencesArray = DESPRIPTION.split(/[.]+\s|[.]/).filter((n) => n);
  const sentencesCount = getRandomInteger(min, max);
  let description = ``;

  for (let i = 0; i < sentencesCount; i++) {
    description += sentencesArray[getRandomInteger(0, sentencesArray.length - 1)] + `. `;
  }

  return description;
};

// Функции из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomNumber = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return lower + Math.random() * (upper - lower);
};
