export interface Holiday {
  country: string;
  date: string;
  day: string;
  iso: string;
  name: string;
  type: string;
  year: number;
}

export interface HolidayError {
  error: string;
}

export enum HolidayType {
  OBSERVANCE = "OBSERVANCE",
  NATIONAL_HOLIDAY = "NATIONAL_HOLIDAY",
  // AND MORE...
}
