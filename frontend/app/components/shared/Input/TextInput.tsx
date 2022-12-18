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
  isLoading?: boolean;
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
  isLoading,
}) => {
  return (
    <label className="flex flex-col gap-1">
      <div className="mb-2">{label}</div>
      <input
        name={name}
        defaultValue={defaultValue}
        type={type}
        aria-invalid={error ? "true" : "false"}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        className={clsx(
          "input border-1 bg-base-200  autofill:!bg-base-200 w-full",
          error ? "input-error" : "focus:border-primary border-gray-500",
          className
        )}
      />
      <InputError isLoading={isLoading}>{error}</InputError>
    </label>
  );
};
