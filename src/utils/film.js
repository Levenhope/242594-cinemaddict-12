import {DESPRIPTION} from "../const.js";
import {getRandomInteger} from "./common.js";

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
