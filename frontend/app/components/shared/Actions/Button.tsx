import clsx from "clsx";
import type { GetAttributesValues } from "@strapi/strapi";
import type { PropsWithChildren } from "react";

import { Icon } from "../Icon";

import { getButtonClass } from "./getButtonClass";

interface Props extends GetAttributesValues<"links.button"> {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const Button = ({
  children,
  mode = "default",
  size = "md",
  className,
  onClick,
  icon,
  text,
  type = "button",
  disabled = false,
  isLoading,
}: PropsWithChildren<Props>) => {
  const buttonClass = clsx(getButtonClass(mode, size), className);

  return (
    <button
      type={type}
      title={text}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {children}
      {icon && <Icon icon={icon} />}
    </button>
  );
};
