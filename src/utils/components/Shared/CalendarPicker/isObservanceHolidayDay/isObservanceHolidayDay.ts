import { format, isEqual } from "date-fns";
import { Holiday, HolidayType } from "../../../../../types/Holiday";
import { filterHolidaysByType } from "../filterHolidaysByType/filterHolidaysByType";

export const isObservanceHolidayDay = (
  day: Date | string,
  holidays: Holiday[]
): boolean => {
  const observanceHolidays: Holiday[] = filterHolidaysByType(
    HolidayType.OBSERVANCE,
    holidays
  );

  // because data fns and api-nija gives different format for data
  // isEqual is false all the time
  const unifiedFormat: string = "MM/dd/yyyy";

  return observanceHolidays.some((holiday: Holiday) => {
    return isEqual(
      format(holiday.date, unifiedFormat),
      format(day, unifiedFormat)
    );
  });
};
