import { HelperText } from "../HelperText/HelperText";

export const TextField: React.FC<OwnProps> = (props) => {
  const {
    label,
    value,
    onChange,
    error,
    helperText,
    type = "text",
    id,
    name,
    className = "",
  } = props;

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-md mb-1">
        {label}
      </label>
      <input
        type={type}
        className={`block w-full text-textPrimary p-2 h-[42px] rounded-md border focus:outline-none focus:border-2 ${
          error
            ? "focus:border-error border-error hover:border-error active:border-error bg-backgroundError"
            : "focus:border-primary border-inactive hover:border-primary active:border-primary bg-white"
        }`}
        name={name}
        id={id}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event)
        }
      />
      {helperText && <HelperText text={helperText} />}
    </div>
  );
};

interface OwnProps {
  className?: string;
  id: string;
  label: string;
  name: string;
  value: string;
  error: boolean;
  type?: "text" | "email";
  helperText: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
