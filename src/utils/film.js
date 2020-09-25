export const getReadableDate = (date) => {
  const formattedDate = new Intl.DateTimeFormat(`en-US`, {day: `numeric`, month: `long`, year: `numeric`});
  const [{value: month}, , {value: day}, , {value: year}] = formattedDate.formatToParts(date);
  return (`${day} ${month} ${year}`);
};

export const getReadableDuration = (minutes) => {
  return `${Math.floor(minutes / 60)}h${minutes % 60}m`;
};
