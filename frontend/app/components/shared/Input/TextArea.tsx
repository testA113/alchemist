import clsx from "clsx";

import { InputError } from "./InputError";

type InputProps = {
  name: string;
  label: string;
  defaultValue?: string;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  className?: string;
  error?: string;
};

export const TextArea: React.FC<InputProps> = ({
  name,
  label,
  defaultValue,
  maxLength,
  minLength,
  placeholder,
  className,
  error,
}) => {
  return (
    <label className="flex flex-col">
      <div className="mb-2">{label}</div>
      <textarea
        name={name}
        defaultValue={defaultValue}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        className={clsx(
          "textarea border-1 bg-base-200 autofill:!bg-base-200 w-full",
          error ? "textarea-error" : "focus:border-primary border-gray-500",
          className
        )}
      />
      {error && <InputError>{error}</InputError>}
    </label>
  );
};
