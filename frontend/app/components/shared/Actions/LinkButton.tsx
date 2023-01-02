import { Link } from "@remix-run/react";
import type { GetAttributesValues } from "@strapi/strapi";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

import { Icon } from "../Icon";

import { getButtonClass } from "./getButtonClass";

interface Props extends GetAttributesValues<"links.link"> {
  disabled?: boolean;
  className?: string;
  external?: boolean;
}

export function LinkButton({
  to,
  icon,
  children,
  className,
  mode,
  size = "md",
  newTab,
  external,
}: PropsWithChildren<Props>) {
  const buttonClass = clsx(getButtonClass(mode, size), className);

  const renderChildren = () => (
    <>
      {children}
      {icon && <Icon icon={icon} />}
    </>
  );

  return external ? (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a
      href={to}
      className={buttonClass}
      target={newTab ? "_blank" : ""}
      rel={newTab ? "noopener noreferrer" : ""}
    >
      {renderChildren()}
    </a>
  ) : (
    <Link
      prefetch="intent"
      to={to}
      className={buttonClass}
      target={newTab ? "_blank" : ""}
      rel={newTab ? "noopener noreferrer" : ""}
    >
      {renderChildren()}
    </Link>
  );
}
