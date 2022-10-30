import { Link } from "@remix-run/react";
import clsx from "clsx";

type Mode = "primary" | "secondary" | "default" | "warning" | "danger" | "link";
type Size = "xs" | "sm" | "md" | "lg";
interface Props {
  action: string | (() => void);
  children?: React.ReactNode;
  mode?: Mode;
  size?: Size;
  className?: string;
  icon?: React.ReactNode;
  submit?: boolean;
  title?: string;
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
};

// getButtonClass uses a switch statement to return the correct class name for the button based on the mode and size prop.
function getButtonClass(mode: Mode, size: Size) {
  let buttonClass = "btn";
  switch (mode) {
    case "primary":
      buttonClass += " btn-primary";
      break;
    case "secondary":
      buttonClass += " btn-secondary";
      break;
    case "default":
      buttonClass += " btn-default";
      break;
    case "warning":
      buttonClass += " btn-warning";
      break;
    case "danger":
      buttonClass += " btn-danger";
      break;
    case "link":
      buttonClass += " btn-link";
      break;
    default:
      buttonClass += " btn-default";
      break;
  }

  switch (size) {
    case "xs":
      buttonClass += " btn-xs";
      break;
    case "sm":
      buttonClass += " btn-sm";
      break;
    case "md":
      buttonClass += " btn-md";
      break;
    case "lg":
      buttonClass += " btn-lg";
      break;
    default:
      buttonClass += " btn-md";
      break;
  }
  return buttonClass;
}