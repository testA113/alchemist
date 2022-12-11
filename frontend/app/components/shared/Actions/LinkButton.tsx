import { Link } from "@remix-run/react";
import type { GetAttributesValues } from "@strapi/strapi";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

import { Icon } from "../Icon";

import { getButtonClass } from "./getButtonClass";

interface Props extends GetAttributesValues<"links.link"> {
  disabled?: boolean;
  className?: string;
}

export function LinkButton({
  to,
  icon,
  children,
  className,
  mode,
  size = "md",
  newTab,
}: PropsWithChildren<Props>) {
  const buttonClass = clsx(getButtonClass(mode, size), className);

  return (
    <Link
      prefetch="intent"
      to={to}
      className={buttonClass}
      target={newTab ? "_blank" : ""}
      rel={newTab ? "noopener noreferrer" : ""}
    >
      {children}
      {icon && <Icon icon={icon} />}
    </Link>
  );
}
