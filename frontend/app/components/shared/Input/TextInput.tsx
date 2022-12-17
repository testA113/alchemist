import clsx from "clsx";

import { InputError } from "./InputError";

type Props = {
  name: string;
  label: string;
  defaultValue?: string;
  type: string;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  className?: string;
  error?: string;
};

export const TextInput: React.FC<Props> = ({
  name,
  label,
  defaultValue,
  type,
  maxLength,
  minLength,
  placeholder,
  className,
  error,
}) => {
  return (
    <label className="flex flex-col">
      <div className="mb-2">{label}</div>
      <input
        name={name}
        defaultValue={defaultValue}
        type={type}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        className={clsx(
          "input border-1 bg-base-200  autofill:!bg-base-200 w-full",
          error ? "input-error" : "focus:border-primary border-gray-500",
          className
        )}
      />
      {error && <InputError>{error}</InputError>}
    </label>
  );
};
