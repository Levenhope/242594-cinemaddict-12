import moment from "moment";

export const getHumanizedTimestamp = (date) => {
  const timeGap = moment(date).diff(moment());
  if (timeGap > -2.592e+8) {
    return moment.duration(timeGap).humanize();
  } else {
    return moment(date).format(`L h:mm`);
  }
};
