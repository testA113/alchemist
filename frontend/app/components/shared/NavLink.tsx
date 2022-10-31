import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";

interface NavLinkProps {
  to: string;
  children?: React.ReactNode;
}
export const NavLink = ({ to, children }: NavLinkProps) => {
  const location = useLocation();
  const isSelected =
    to === location.pathname || location.pathname.startsWith(`${to}/`);

  return (
    <div className="px-[1vw] py-2">
      <Link
        prefetch="intent"
        className={clsx(
          "underlined focus:outline-none block whitespace-nowrap uppercase mx-3 my-2",
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
