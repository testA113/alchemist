import clsx from "clsx";
import { useField } from "remix-validated-form";

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
  isLoading,
}) => {
  const { error, getInputProps } = useField(name);

  return (
    <label className="flex flex-col gap-1">
      <div className="mb-2">{label}</div>
      <input
        {...getInputProps({ id: name })}
        name={name}
        defaultValue={defaultValue}
        type={type}
        aria-invalid={error ? "true" : "false"}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        className={clsx(
          "input border-1 bg-base-200  autofill:!bg-base-200 [&:-internal-autofill-selected]:!bg-base-200 w-full",
          error ? "input-error" : "focus:border-primary border-gray-500",
          className
        )}
      />
      <InputError isLoading={isLoading}>{error}</InputError>
    </label>
  );
};
