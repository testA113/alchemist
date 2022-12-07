import { Link, useLocation } from "@remix-run/react";
import type { GetAttributesValues } from "@strapi/strapi";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

interface Props extends GetAttributesValues<"links.link"> {
  disabled?: boolean;
  className?: string;
}

// special animated style for the header nav links
export const NavLink = ({ to, children }: PropsWithChildren<Props>) => {
  const location = useLocation();
  const isSelected =
    to === location?.pathname || location?.pathname.startsWith(`${to}/`);

  return (
    <div className="px-[1vw] py-2">
      <Link
        prefetch="intent"
        className={clsx(
          "underlined mx-3 my-2 block whitespace-nowrap text-lg uppercase focus:outline-none",
          {
            "text-accent": isSelected,
            "text-body": !isSelected,
          }
        )}
        to={to}
      >
        {children}
      </Link>
    </div>
  );
};
