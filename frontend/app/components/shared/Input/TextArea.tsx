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
  isLoading?: boolean;
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
  isLoading,
}) => {
  return (
    <label className="flex flex-col gap-1">
      <div className="mb-2">{label}</div>
      <textarea
        name={name}
        defaultValue={defaultValue}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        className={clsx(
          "textarea border-1 bg-base-200 autofill:!bg-base-200 w-full",
          error ? "textarea-error" : "focus:border-primary border-gray-500",
          className
        )}
      />
      <InputError isLoading={isLoading}>{error}</InputError>
    </label>
  );
};
