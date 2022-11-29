import { Link } from "@remix-run/react";
import clsx from "clsx";

type Mode = "primary" | "secondary" | "default" | "warning" | "danger" | "link";
type Size = "xs" | "sm" | "md" | "lg";
interface Props {
  action?: string | (() => void);
  children?: React.ReactNode;
  mode?: Mode;
  size?: Size;
  className?: string;
  icon?: React.ReactNode;
  submit?: boolean;
  title?: string;
  disabled?: boolean;
}

export const Button = ({
  action,
  children,
  mode = "default",
  size = "md",
  className,
  icon,
  submit = false,
  title,
  disabled = false,
}: Props) => {
  const buttonClass = clsx(getButtonClass(mode, size), className);

  if (typeof action === "string") {
    return (
      <Link prefetch="intent" to={action} className={buttonClass}>
        {icon}
        {children}
      </Link>
    );
  }

  if (action) {
    return (
      <button
        type={submit ? "submit" : "button"}
        title={title}
        className={buttonClass}
        onClick={() => {
          action && action();
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <div title={title} className={buttonClass}>
      {children}
    </div>
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
