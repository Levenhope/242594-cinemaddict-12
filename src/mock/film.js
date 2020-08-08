import {POSTERS, TITLES, GENRES, DESPRIPTION, NAMES, COUNTRIES, AGES} from "../const.js";
import {getRandomInteger, getRandomNumber} from "../utils.js";

const generateDate = () => {
  const currentDate = new Date();
  return (getRandomInteger(currentDate.getFullYear(), 1895));
};

const generateDuration = () => {
  const randomHours = getRandomInteger(0, 4);
  const randomMinutes = getRandomInteger(0, 60);
  return (randomHours + 'h ' + randomMinutes + 'm');
};

const generateDescription = () => {
  const sentencesArray = DESPRIPTION.split(/[.]+\s|[.]/).filter(n => n);
  const sentencesCount = getRandomInteger(1, 5);
  let description = ``;

  for(let i = 0; i < sentencesCount; i++) {
    description += sentencesArray[getRandomInteger(0, sentencesArray.length - 1)] + `. `;
  }

  return description;
};

const generateInfoList = (arr, maxCount, isJoined = false) => {
  const itemsCount = getRandomInteger(1, maxCount);
  const itemsList = [];

  for(let i = 0; i < itemsCount; i++) {
    itemsList.push(arr[getRandomInteger(0, arr.length - 1)]);
  }

  return (isJoined ? itemsList.join(`, `) : itemsList);
};

export const generateFilm = () => {
  const poster = POSTERS[getRandomInteger(0, POSTERS.length - 1)];
  const title = TITLES[getRandomInteger(0, TITLES.length - 1)];
  const rating = getRandomNumber(0, 10).toFixed(2);
  const comments = getRandomInteger(0, 5);
  const director = NAMES[getRandomInteger(0, NAMES.length - 1)];
  const country = COUNTRIES[getRandomInteger(0, COUNTRIES.length - 1)];
  const age = AGES[getRandomInteger(0, AGES.length - 1)];

  return {
    poster,
    title,
    originalTitle: title,
    rating,
    year: generateDate(),
    duration: generateDuration(),
    genres: generateInfoList(GENRES, 3),
    description: generateDescription(),
    comments,
    director,
    writers: generateInfoList(NAMES, NAMES.length, true),
    actors: generateInfoList(NAMES, NAMES.length, true),
    country,
    age
  };
};
