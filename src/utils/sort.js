export const sortByDate = (a, b) => {
  return b.date.getTime() - a.date.getTime();
};

export const sortByRating = (a, b) => {
  return b.rating - a.rating;
};
