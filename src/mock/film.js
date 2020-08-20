import {POSTERS, TITLES, GENRES, NAMES, COUNTRIES, AGES} from "../const.js";
import {getRandomDate, getRandomText} from "../utils/film.js";
import {getRandomInteger, getRandomNumber} from "../utils/common.js";

const generateDuration = () => {
  const randomHours = getRandomInteger(0, 4);
  const randomMinutes = getRandomInteger(0, 60);
  return (randomHours + `h ` + randomMinutes + `m`);
};

const generateInfoList = (arr, maxCount, isJoined = false) => {
  const itemsCount = getRandomInteger(1, maxCount);
  const itemsList = [];

  for (let i = 0; i < itemsCount; i++) {
    itemsList.push(arr[getRandomInteger(0, arr.length - 1)]);
  }

  return (isJoined ? itemsList.join(`, `) : itemsList);
};

export const generateFilm = () => {
  const poster = POSTERS[getRandomInteger(0, POSTERS.length - 1)];
  const title = TITLES[getRandomInteger(0, TITLES.length - 1)];
  const rating = getRandomNumber(0, 10).toFixed(2);
  const commentsNumber = getRandomInteger(0, 5);
  const director = NAMES[getRandomInteger(0, NAMES.length - 1)];
  const country = COUNTRIES[getRandomInteger(0, COUNTRIES.length - 1)];
  const age = AGES[getRandomInteger(0, AGES.length - 1)];
  const date = getRandomDate(new Date(1895, 1, 1));
  const description = getRandomText(1, 5);

  return {
    poster,
    title,
    originalTitle: title,
    rating,
    date,
    duration: generateDuration(),
    genres: generateInfoList(GENRES, 3),
    description,
    commentsNumber,
    director,
    writers: generateInfoList(NAMES, NAMES.length, true),
    actors: generateInfoList(NAMES, NAMES.length, true),
    country,
    age,
    isInWatchlist: Boolean(getRandomInteger(0, 1)),
    isInHistory: Boolean(getRandomInteger(0, 1)),
    isInFavorites: Boolean(getRandomInteger(0, 1))
  };
};
