type Mode = "primary" | "secondary" | "default" | "warning" | "danger" | "link";
type Size = "xs" | "sm" | "md" | "lg";

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
export function getButtonClass(mode: Mode, size: Size) {
  return `btn ${buttonModeClassMap[mode]} ${buttonSizeClassMap[size]} gap-2`;
}
