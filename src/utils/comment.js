import moment from "moment";
import {ERROR_ANIMATION_TIMEOUT} from "../const.js";

export const getHumanizedTimestamp = (date) => {
  const timeGap = moment(date).diff(moment());
  if (timeGap > -2.592e+8) {
    return moment.duration(timeGap).humanize();
  } else {
    return moment(date).format(`L h:mm`);
  }
};

export const showErrorAnimation = (element) => {
  element.classList.remove(`error-animate`);
  setTimeout(function () {
    element.classList.add(`error-animate`);
  }, ERROR_ANIMATION_TIMEOUT);
};