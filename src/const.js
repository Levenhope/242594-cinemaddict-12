export const FILMS_NUMBER_MAIN = 17;
export const FILMS_NUMBER_TOP_RATED = 2;
export const FILMS_NUMBER_COMMENTED = 2;
export const FILMS_NUMBER_PER_STEP = 5;

const POSTERS_DIRECTORY_PATH = `./images/posters/`;
const EMOJIS_DIRECTORY_PATH = `./images/emoji/`;

export const POSTERS = [
  `the-dance-of-life.jpg`,
  `sagebrush-trail.jpg`,
  `the-man-with-the-golden-arm.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `popeye-meets-sinbad.png`,
  `the-great-flamarion.jpg`,
  `made-for-each-other.png`,
].map((filename) => `${POSTERS_DIRECTORY_PATH}${filename}`);

export const TITLES = [
  `The Dance of Life`,
  `Sagebrush trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `The Great Flamarion`,
  `Made for Each Other`
];

export const GENRES = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`
];

export const DESPRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

export const NAMES = [
  `Anthony Mann`,
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`
];

export const COUNTRIES = [
  `Russia`,
  `USA`,
  `France`,
  `Italy`,
  `Germany`
];

export const AGES = [
  `0+`,
  `6+`,
  `12+`,
  `16+`,
  `18+`
];

export const EMOJIS = [
  `angry.png`,
  `puke.png`,
  `sleeping.png`,
  `smile.png`,
].map((filename) => `${EMOJIS_DIRECTORY_PATH}${filename}`);
