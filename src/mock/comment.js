import {NAMES, EMOJIS} from "../const.js";
import {getRandomDate, getRandomText} from "../utils/film.js";
import {getRandomInteger} from "../utils/common.js";

export const generateComment = () => {
  const name = NAMES[getRandomInteger(0, NAMES.length - 1)];
  const date = getRandomDate(new Date(2019, 1, 1)).toLocaleString(`en-US`, {hour12: false, day: `2-digit`, month: `2-digit`, year: `2-digit`, hour: `numeric`, minute: `numeric`}).split(`,`).join(``);
  const commentText = getRandomText(1, 2);
  const emoji = EMOJIS[getRandomInteger(0, EMOJIS.length - 1)];

  return {
    name,
    date,
    commentText,
    emoji
  };
};
