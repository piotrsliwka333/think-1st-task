import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../Button/Button";
import { HelperText } from "../HelperText/HelperText";

export const UploadFile: React.FC<OwnProps> = (props) => {
  const {
    label,
    onChange,
    error,
    helperText,
    id,
    name,
    value,
    className = "",
  } = props;

  const [preview, setPreview] = useState<ArrayBuffer | null | string>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(value);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      const firstFile = acceptedFiles[0];

      if (firstFile) {
        setFile(firstFile);
        reader.readAsDataURL(firstFile);
        reader.onload = function () {
          setPreview(reader.result);
        };
        onChange(firstFile);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
    },
  });

  const handleRemoveFile = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setFile(null);
    setPreview(null);
    onChange(null);
  };

  const handleStopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleTogglePreview = () =>
    setShowPreview((prevState: boolean) => !prevState);

  useEffect(() => {
    setFile(value);
    if (!value) setPreview(null);
  }, [value]);

  return (
    <div className={className}>
      <label htmlFor={id} className="block mb-1">
        {label}
      </label>
      <div
        {...getRootProps()}
        className={`rounded-md border px-6 py-8 mb-2 h-[98px] focus:outline-none focus:border-2 flex items-center justify-center  ${
          error
            ? "focus:border-error border-error hover:border-error active:border-error bg-backgroundError"
            : "focus:border-primary border-inactive hover:border-primary active:border-primary bg-white"
        } ${isDragActive ? "border-primary border-2 bg-white" : ""}`}
      >
        <input {...getInputProps()} id={id} name={name} />
        {file ? (
          <div
            className="flex items-center justify-center w-full"
            onClick={handleStopPropagation}
          >
            <p className="mr-2">{file.name}</p>
            <button
              type="button"
              className="p-1"
              onClick={(
                event: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ) => handleRemoveFile(event)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM9.879 8.464C9.69946 8.28275 9.45743 8.17697 9.20245 8.16832C8.94748 8.15967 8.69883 8.2488 8.50742 8.41747C8.31601 8.58613 8.1963 8.82159 8.1728 9.07562C8.14929 9.32966 8.22378 9.58308 8.381 9.784L8.465 9.879L10.585 11.999L8.465 14.121C8.28375 14.3005 8.17797 14.5426 8.16932 14.7975C8.16067 15.0525 8.2498 15.3012 8.41847 15.4926C8.58713 15.684 8.82258 15.8037 9.07662 15.8272C9.33066 15.8507 9.58408 15.7762 9.785 15.619L9.879 15.536L12 13.414L14.121 15.536C14.3005 15.7173 14.5426 15.823 14.7975 15.8317C15.0525 15.8403 15.3012 15.7512 15.4926 15.5825C15.684 15.4139 15.8037 15.1784 15.8272 14.9244C15.8507 14.6703 15.7762 14.4169 15.619 14.216L15.536 14.121L13.414 12L15.536 9.879C15.7173 9.69946 15.823 9.45743 15.8317 9.20245C15.8403 8.94748 15.7512 8.69883 15.5825 8.50742C15.4139 8.31601 15.1784 8.1963 14.9244 8.1728C14.6703 8.14929 14.4169 8.22378 14.216 8.381L14.121 8.464L12 10.586L9.879 8.464Z"
                  fill="#000853"
                />
              </svg>
            </button>
          </div>
        ) : (
          <p className="text-textSecondary flex items-center justify-center w-full">
            <span className="cursor-pointer text-primary decoration-primary decoration-solid decoration-1 underline underline-offset-2 block mr-1.5">
              {isDragActive ? "Drop your file" : "Upload a file "}
            </span>
            <span className="hidden md:block">
              {isDragActive ? "here" : "or drag and drop here"}
            </span>
          </p>
        )}
      </div>
      {preview && (
        <Button
          className="mb-2"
          fontSize="small"
          onClick={handleTogglePreview}
          type="button"
          text={showPreview ? "Hide Preview" : "Show Preview"}
        />
      )}
      {preview && showPreview && <img src={preview as string} alt={label} />}
      {helperText && <HelperText text={helperText} />}
    </div>
  );
};

interface OwnProps {
  className?: string;
  id: string;
  value: File | null;
  label: string;
  name: string;
  error: boolean;
  helperText: string | null;
  onChange: (file: File | null) => void;
}
