import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isSunday,
  isToday,
  parse,
  startOfToday,
} from "date-fns";
import { useEffect, useState } from "react";
import { HolidaysAPI } from "../../../api/HolidaysAPI";
import { AvailableHour } from "../../../types/AvailableHour";
import { Holiday, HolidayError } from "../../../types/Holiday";
import { convertGetDayToStartFromMonday } from "../../../utils/components/Shared/CalendarPicker/convertGetDayToStartFromMonday/convertGetDayToStartFromMonday";
import { findHolidayByDate } from "../../../utils/components/Shared/CalendarPicker/findHolidayByDate/findHolidayByDate";
import { isNationalHolidayDay } from "../../../utils/components/Shared/CalendarPicker/isNationalHolidayDay/isNationalHolidayDay";
import { isObservanceHolidayDay } from "../../../utils/components/Shared/CalendarPicker/isObservanceHolidayDay/isObservanceHolidayDay";
import { CalendarPickerError } from "./CalendarPickerError";
import { CalendarPickerSkeleton } from "./CalendarPickerSkeleton";
import { HelperText } from "../HelperText/HelperText";

export const CalendarPicker: React.FC<OwnProps> = (props) => {
  const { className, label, dateError, timeError, onChange, value } = props;

  const MONTH_FORMAT: string = "MMM-yyyy";
  const today = startOfToday();

  const [holidays, setHolidays] = useState<Holiday[] | null>(null);
  const [holidaysError, setHolidaysError] = useState<HolidayError | null>(null);

  const [time, setTime] = useState<string | null>(null);

  const [selectedDay, setSelectedDay] = useState<Date | null>(value);

  const [currentMonth, setCurrentMonth] = useState<any>(
    format(today, MONTH_FORMAT)
  );
  const firstDayCurrentMonth: Date = parse(
    currentMonth,
    MONTH_FORMAT,
    new Date()
  );

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  const handleClickPreviousMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, MONTH_FORMAT));
  };

  const handleClickNextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, MONTH_FORMAT));
  };

  const handleSetHour = (availableHour: AvailableHour, selectedDay: Date) => {
    const event = new Date(selectedDay);
    event.setHours(availableHour.hour);
    event.setMinutes(availableHour.minutes);
    setTime(availableHour.value);
    setSelectedDay(event);
    onChange(event);
  };

  const handleChangeSelectedDay = (selectedDay: Date) => {
    let selectedDayPayload = selectedDay;

    if (time) {
      const event = new Date(selectedDay);
      const hours = time.split(":")[0];
      const minutes = time.split(":")[1];

      event.setHours(+hours);
      event.setMinutes(+minutes);
      selectedDayPayload = event;
    }
    setSelectedDay(selectedDayPayload);
    onChange(selectedDayPayload);
  };

  useEffect(() => {
    (async () => {
      try {
        const data: Holiday[] | HolidayError = await HolidaysAPI.findMany();
        if ("error" in data) return setHolidaysError(data);
        setHolidays(data);
      } catch (e) {
        setHolidaysError({
          error: "Something went wrong during fetching holidays",
        });
      }
    })();
  }, []);

  useEffect(() => {
    setSelectedDay(value);
    if (!value) setTime(null);
  }, [value]);

  if (holidaysError)
    return (
      <CalendarPickerError
        holidaysError={holidaysError}
        className={className}
        label={label}
      />
    );
  if (!holidays)
    return <CalendarPickerSkeleton className={className} label={label} />;
  return (
    <div className={`${className} md:flex md:justify-between`}>
      <div className="mb-2 md:mb-0 md:w-[70%]">
        <p className="mb-1">{label}</p>
        <div>
          <div
            className={`border px-6 pt-8 pb-2 rounded-md ${
              dateError
                ? "border-error bg-backgroundError"
                : "border-inactive bg-white"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <button type="button" onClick={handleClickPreviousMonth}>
                <span className="sr-only">Previous month</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M9.5 16.866C8.83333 16.4811 8.83333 15.5189 9.5 15.134L18.5 9.93782C19.1667 9.55292 20 10.034 20 10.8038L20 21.1962C20 21.966 19.1667 22.4471 18.5 22.0622L9.5 16.866Z"
                    fill="#CBB6E5"
                  />
                </svg>
              </button>
              <h2 className="font-semibold ">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </h2>
              <button onClick={handleClickNextMonth} type="button">
                <span className="sr-only">Next month</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M22.5 16.866C23.1667 16.4811 23.1667 15.5189 22.5 15.134L13.5 9.93782C12.8333 9.55292 12 10.034 12 10.8038L12 21.1962C12 21.966 12.8333 22.4471 13.5 22.0622L22.5 16.866Z"
                    fill="#CBB6E5"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-7 text-sm mt-6 text-center">
              <div>Mo</div>
              <div>Tu</div>
              <div>We</div>
              <div>Th</div>
              <div>Fr</div>
              <div>Sa</div>
              <div>Su</div>
            </div>
            <div className="grid grid-cols-7 mt-2">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    //getDay() - based on https://date-fns.org/v4.1.0/docs/getDay#returns
                    // returns 0 for sunday
                    // so it treats sunday as a first day of week
                    // that's way we have to put -1 to change and order that
                    // monday represents the first day
                    dayIdx === 0 &&
                      COL_START_CLASSES[
                        convertGetDayToStartFromMonday(getDay(day))
                      ],
                    "py-1"
                  )}
                >
                  <button
                    type="button"
                    disabled={
                      isSunday(day) || isNationalHolidayDay(day, holidays)
                    }
                    onClick={() => handleChangeSelectedDay(day)}
                    className={classNames(
                      // sundays and national_holidays
                      "hover:bg-backgroundPrimary disabled:text-textSecondary disabled:hover:bg-transparent flex h-8 w-8 items-center justify-center rounded-full",
                      // observance day
                      isObservanceHolidayDay(day, holidays) &&
                        "decoration-primary decoration-solid decoration-2 underline underline-offset-4",
                      // selected day
                      selectedDay &&
                        isSameDay(day, selectedDay) &&
                        "bg-primary text-white hover:bg-primary",
                      isToday(day) && "font-bold border border-primary "
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>
                </div>
              ))}
            </div>
          </div>
          {selectedDay && isObservanceHolidayDay(selectedDay, holidays) && (
            <div className="text-sm mt-2 flex items-center">
              <div className="mr-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M9 17C7.41775 17 5.87104 16.5308 4.55544 15.6518C3.23985 14.7727 2.21447 13.5233 1.60897 12.0615C1.00347 10.5997 0.84504 8.99113 1.15372 7.43928C1.4624 5.88743 2.22433 4.46197 3.34315 3.34315C4.46197 2.22433 5.88743 1.4624 7.43928 1.15372C8.99113 0.845037 10.5997 1.00346 12.0615 1.60896C13.5233 2.21447 14.7727 3.23985 15.6518 4.55544C16.5308 5.87103 17 7.41775 17 9C17 11.1217 16.1571 13.1566 14.6569 14.6569C13.1566 16.1571 11.1217 17 9 17ZM8.00667 13C8.00667 13.2652 8.11203 13.5196 8.29956 13.7071C8.4871 13.8946 8.74145 14 9.00667 14C9.27189 14 9.52624 13.8946 9.71378 13.7071C9.90131 13.5196 10.0067 13.2652 10.0067 13V8.40667C10.0067 8.27535 9.9808 8.14531 9.93055 8.02398C9.88029 7.90266 9.80664 7.79242 9.71378 7.69956C9.62092 7.6067 9.51068 7.53304 9.38935 7.48279C9.26803 7.43253 9.13799 7.40667 9.00667 7.40667C8.87535 7.40667 8.74531 7.43253 8.62399 7.48279C8.50266 7.53304 8.39242 7.6067 8.29956 7.69956C8.2067 7.79242 8.13305 7.90266 8.08279 8.02398C8.03254 8.14531 8.00667 8.27535 8.00667 8.40667V13ZM9 4C8.77321 4 8.55152 4.06725 8.36295 4.19325C8.17438 4.31925 8.02741 4.49833 7.94062 4.70786C7.85383 4.91738 7.83113 5.14794 7.87537 5.37037C7.91961 5.5928 8.02882 5.79712 8.18919 5.95748C8.34955 6.11785 8.55387 6.22706 8.7763 6.2713C8.99873 6.31555 9.22929 6.29284 9.43881 6.20605C9.64834 6.11926 9.82743 5.97229 9.95342 5.78372C10.0794 5.59515 10.1467 5.37346 10.1467 5.14667C10.1467 4.84255 10.0259 4.55089 9.81082 4.33585C9.59578 4.12081 9.30412 4 9 4Z"
                    fill="#CBB6E5"
                  />
                </svg>
              </div>
              {<p>{findHolidayByDate(selectedDay, holidays)!!.name + "."}</p>}
            </div>
          )}
          {dateError && <HelperText text={dateError} />}
        </div>
      </div>
      {selectedDay && (
        <div className="w-full md:w-[22%]">
          <p className="mb-1 px-2">Time</p>
          <ul
            className={`w-full rounded-md flex flex-wrap gap-2 md:space-y-2 md:block p-2 ${
              timeError ? "border border-error bg-backgroundError" : ""
            }`}
          >
            {AVAILABLE_HOURS.map((hour: AvailableHour) => (
              <li key={hour.value}>
                <button
                  type="button"
                  onClick={() => handleSetHour(hour, selectedDay!!)}
                  className={`h-[42px] w-[80px] py-2 px-4 flex justify-center items-center border border-1 border-inactive rounded-md bg-white ${
                    time === hour.value ? "border-2 border-primary" : ""
                  }`}
                >
                  {hour.value}
                </button>
              </li>
            ))}
          </ul>
          {timeError && <HelperText text={timeError} />}
        </div>
      )}
    </div>
  );
};

const classNames = (...classes: any[]) => {
  return classes.filter(Boolean).join(" ");
};

const AVAILABLE_HOURS: AvailableHour[] = [
  {
    value: "12:00",
    hour: 12,
    minutes: 0,
  },
  {
    value: "14:00",
    hour: 14,
    minutes: 0,
  },
  {
    value: "16:30",
    hour: 16,
    minutes: 30,
  },
  {
    value: "18:30",
    hour: 18,
    minutes: 30,
  },
  {
    value: "20:00",
    hour: 20,
    minutes: 0,
  },
];

const COL_START_CLASSES: string[] = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export interface OwnProps {
  className?: string;
  label: string;
  value: Date | null;
  timeError: string | null;
  dateError: string | null;
  onChange: (date: Date) => void;
}
