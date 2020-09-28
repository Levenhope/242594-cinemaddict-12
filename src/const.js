import {Lang} from "./lang.js";

export const AUTHORIZATION = `Basic dfhsdkjfhsdf74r3`;
export const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

export const FILMS_NUMBER_PER_STEP = 5;

export const ERROR_ANIMATION_TIMEOUT = 10;

export const EMOJI_DIRECTORY_PATH = `./images/emoji/`;

export const EmojiImageSize = {
  SMALL: 30,
  BIG: 55
};

export const Emoji = {
  angry: `angry.png`,
  puke: `puke.png`,
  sleeping: `sleeping.png`,
  smile: `smile.png`
};

export const ScreenMode = {
  DEFAULT: `DEFAULT`,
  MODAL: `MODAL`
};

export const UpdateType = {
  NAVIGATION: `NAVIGATION`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`,
  SORT: `SORT`
};

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

export const Category = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

export const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`
};

export const StatisticsFilters = [
  {
    name: Lang.ALL_TIME,
    value: `all-time`
  },
  {
    name: Lang.TODAY,
    value: `today`
  },
  {
    name: Lang.WEEK,
    value: `week`
  },
  {
    name: Lang.MONTH,
    value: `month`
  },
  {
    name: Lang.YEAR,
    value: `year`
  }
];

export const Rank = {
  NOVICE: Lang.RANK_NOVICE,
  FAN: Lang.RANK_FAN,
  MOVIE_BUFF: Lang.RANK_MOVIE_BUFF
};
