import { OwnProps } from "./CalendarPicker";

export const CalendarPickerSkeleton: React.FC<
  Omit<OwnProps, "onChange" | "timeError" | "dateError" | "value">
> = (props) => {
  const { className, label } = props;

  return (
    <div className={`${className} md:w-[70%]`}>
      <p className="mb-1">{label}</p>
      <div className="h-[366px] border border-inactive p-4 rounded-md bg-white flex items-center justify-between w-full">
        <div className="animate-pulse space-y-2 w-full">
          <div className="h-4 bg-backgroundPrimary rounded w-full" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-4 bg-backgroundPrimary rounded col-span-2"></div>
            <div className="h-4 bg-backgroundPrimary rounded col-span-1"></div>
          </div>
          <div className="h-4 bg-backgroundPrimary rounded w-full" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-4 bg-backgroundPrimary rounded col-span-2"></div>
            <div className="h-4 bg-backgroundPrimary rounded col-span-1"></div>
          </div>
          <div className="h-4 bg-backgroundPrimary rounded w-full" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-4 bg-backgroundPrimary rounded col-span-2"></div>
            <div className="h-2 bg-backgroundPrimary rounded col-span-1"></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-8 bg-backgroundPrimary rounded col-span-2"></div>
            <div className="h-8 bg-backgroundPrimary rounded col-span-1"></div>
          </div>
          <div className="h-4 bg-backgroundPrimary rounded w-full" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-16 bg-backgroundPrimary rounded col-span-1"></div>
            <div className="h-16 bg-backgroundPrimary rounded col-span-1"></div>
          </div>
          <div className="h-4 bg-backgroundPrimary rounded w-full" />
          <div className="h-4 bg-backgroundPrimary rounded w-full" />
        </div>
      </div>
    </div>
  );
};
