import { useEffect, useState } from "react";

export const Slider: React.FC<OwnProps> = (props) => {
  const { label, value, onChange, id, name, className = "", max, min } = props;
  const [amount, setAmount] = useState<number>(value);

  useEffect(() => {
    setAmount(value);
  }, [value]);

  if (amount < min) throw new Error("Adjust min value");
  return (
    <div className={`${className} relative w-full`}>
      <label htmlFor={id} className="block text-md mb-4">
        {label}
      </label>

      <div className={`relative`}>
        <input
          max={max}
          min={min}
          className={`slider z-20 relative w-full h-1 bg-transparent rounded-lg appearance-none cursor-pointer focus:outline-none`}
          type="range"
          name={name}
          id={id}
          value={amount}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange(+event.target.value)
          }
        />

        {/* main track*/}
        <div
          className={`block z-10 absolute  bg-inactive h-1  start-0 bottom-[5px] `}
          style={{ width: `100%` }}
        ></div>

        {/* following track*/}
        <div
          className={`block z-10 absolute  bg-primary h-1  start-0 bottom-[5px] `}
          style={{ width: `${((amount - min) * 100) / (max - min)}%` }}
        ></div>

        {/* here we need to adjust that the entire
              100% of track-field for value helper text
              indicator will be smaller about 20px 
              because size of this counter is 20px
          */}
        <div className="relative w-[calc(100%-20px)] mt-1">
          <span
            className="tooltip text-sm absolute text-primary bg-white rounded-md flex items-center justify-center start-0 -bottom-8 w-[40px] h-[25px] border border-inactive translate-x-[-25%]"
            style={{ left: `${((amount - min) * 100) / (max - min)}%` }}
          >
            {amount}
          </span>
        </div>

        <span className="text-sm absolute start-0 bottom-4 translate-x-[50%]">
          {min}
        </span>
        <span className="text-sm absolute end-0 bottom-4">{max}</span>
      </div>
    </div>
  );
};

interface OwnProps {
  className?: string;
  id: string;
  label: string;
  name: string;
  value: number;
  max: number;
  min: number;
  onChange: (amount: number) => void;
}
