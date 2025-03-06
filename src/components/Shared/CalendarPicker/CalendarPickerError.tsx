import { HolidayError } from "../../../types/Holiday";
import { OwnProps as CalendarPickerProps } from "./CalendarPicker";

export const CalendarPickerError: React.FC<OwnProps> = (props) => {
  const { className, label, holidaysError } = props;

  return (
    <div className={`${className} md:w-[70%]`}>
      <p className="mb-1">{label}</p>
      <div className="h-[366px] border border-inactive p-8 rounded-md bg-white flex items-center justify-between w-full">
        <div>
          <h1 className="text-error text-xl mb-2 text-center">
            {holidaysError.error}
          </h1>
          <p className="text-error mb-2 text-center">Try Again later</p>
        </div>
      </div>
    </div>
  );
};

interface OwnProps
  extends Omit<
    CalendarPickerProps,
    "onChange" | "timeError" | "dateError" | "value"
  > {
  holidaysError: HolidayError;
}
