import { Holiday, HolidayType } from "../../../../../types/Holiday";

export const filterHolidaysByType = (type: HolidayType, holidays: Holiday[]) =>
  holidays.filter((holiday: Holiday) => holiday.type === type);
