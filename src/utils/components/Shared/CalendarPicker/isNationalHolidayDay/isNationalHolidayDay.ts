import { format, isEqual } from "date-fns";
import { Holiday, HolidayType } from "../../../../../types/Holiday";
import { filterHolidaysByType } from "../filterHolidaysByType/filterHolidaysByType";

export const isNationalHolidayDay = (
  day: Date,
  holidays: Holiday[]
): boolean => {
  const nationalHolidays: Holiday[] = filterHolidaysByType(
    HolidayType.NATIONAL_HOLIDAY,
    holidays
  );

  // because data fns and api-nija gives different format for data
  // isEqual is false all the time
  const unifiedFormat: string = "MM/dd/yyyy";

  return nationalHolidays.some((holiday: Holiday) => {
    return isEqual(
      format(holiday.date, unifiedFormat),
      format(day, unifiedFormat)
    );
  });
};
