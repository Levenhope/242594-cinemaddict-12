export const getReadableDate = (date) => {
  const formattedDate = new Intl.DateTimeFormat(`en-US`, {day: `numeric`, month: `long`, year: `numeric`});
  const [{value: month}, , {value: day}, , {value: year}] = formattedDate.formatToParts(date);
  return (`${day} ${month} ${year}`);
};

export const getReadableDuration = (minutes) => {
  const durationHours = Math.floor(minutes / 60);
  const durationMinutes = minutes % 60;
  return (durationHours < 1 ? `` : durationHours + `h`) + (durationMinutes > 0 ? durationMinutes + `m` : ``);
};
