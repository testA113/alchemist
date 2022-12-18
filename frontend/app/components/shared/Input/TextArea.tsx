import clsx from "clsx";
import { useField } from "remix-validated-form";

import { InputError } from "./InputError";

type InputProps = {
  name: string;
  label: string;
  defaultValue?: string;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  className?: string;
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
  isLoading,
}) => {
  const { error, getInputProps } = useField(name);

  return (
    <label className="flex flex-col gap-1">
      <div className="mb-2">{label}</div>
      <textarea
        {...getInputProps({ id: name })}
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
