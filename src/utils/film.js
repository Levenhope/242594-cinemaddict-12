import moment from "moment";

export const getReadableDuration = (minutes) => {
  return `${Math.floor(minutes / 60)}h${minutes % 60}m`;
};