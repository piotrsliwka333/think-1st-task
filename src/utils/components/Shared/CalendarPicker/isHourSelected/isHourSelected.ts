import { getHours } from "date-fns";

export const isHourSelected = (date: Date): boolean => {
  return getHours(date) !== 0;
};
