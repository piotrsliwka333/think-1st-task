import { format, isEqual } from "date-fns";
import { Holiday } from "../../../../../types/Holiday";

export const findHolidayByDate = (
  date: string | Date,
  holidays: Holiday[]
): Holiday | undefined => {
  const unifiedFormat: string = "MM/dd/yyyy";

  return holidays.find((holiday: Holiday) => {
    return isEqual(
      format(holiday.date, unifiedFormat),
      format(date, unifiedFormat)
    );
  });
};
