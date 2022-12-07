import { Link } from "@remix-run/react";
import clsx from "clsx";
import type { GetAttributesValues } from "@strapi/strapi";
import type { PropsWithChildren } from "react";

type Mode = "primary" | "secondary" | "default" | "warning" | "danger" | "link";
type Size = "xs" | "sm" | "md" | "lg";

interface Props extends GetAttributesValues<"links.button"> {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const Button = ({
  action,
  children,
  mode = "default",
  size = "md",
  className,
  onClick,
  icon,
  text,
  type,
  disabled = false,
}: PropsWithChildren<Props>) => {
  const buttonClass = clsx(getButtonClass(mode, size), className);

  return (
    <button type={type} title={text} className={buttonClass} onClick={onClick}>
      {children}
      {icon}
    </button>
  );
};

const buttonModeClassMap = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  default: "btn-default",
  warning: "btn-warning",
  danger: "btn-danger",
  link: "btn-link",
};

const buttonSizeClassMap = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

// getButtonClass uses a switch statement to return the correct class name for the button based on the mode and size prop.
function getButtonClass(mode: Mode, size: Size) {
  return `btn ${buttonModeClassMap[mode]} ${buttonSizeClassMap[size]}`;
}
