import {POSTERS, TITLES, GENRES, DESPRIPTION} from "../const.js";
import {getRandomInteger, getRandomNumber} from "../utils.js";

const generateDate = () => {
  const currentDate = new Date();
  return (getRandomInteger(currentDate.getFullYear(), 1895));
};

const generateDuration = () => {
  const randomHours = getRandomInteger(0, 5);
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

export const generateCard = () => {
  const poster = POSTERS[getRandomInteger(0, POSTERS.length - 1)];
  const title = TITLES[getRandomInteger(0, TITLES.length - 1)];
  const rating = getRandomNumber(0, 10).toFixed(2);
  const genre = GENRES[getRandomInteger(0, GENRES.length - 1)];
  const comments = getRandomInteger(0, 5);

  return {
    poster,
    title,
    rating,
    year: generateDate(),
    duration: generateDuration(),
    genre,
    description: generateDescription(),
    comments
  };
};
