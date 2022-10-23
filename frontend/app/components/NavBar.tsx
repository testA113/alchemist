import clsx from "clsx";
import { Link, useLocation } from "@remix-run/react";
import { Menu } from "lucide-react";

const links = [
  { name: "Private events", to: "/privateevents" },
  { name: "Corporate events", to: "/corporateevents" },
  { name: "Catering", to: "/catering" },
  { name: "About", to: "/about" },
];

interface NavLinkProps {
  to: string;
  children?: React.ReactNode;
}
const NavLink = ({ to, children }: NavLinkProps) => {
  const location = useLocation();
  const isSelected =
    to === location.pathname || location.pathname.startsWith(`${to}/`);

  return (
    <li className="px-5 py-2">
      <Link
        prefetch="intent"
        className={clsx(
          "underlined focus:outline-none block whitespace-nowrap text-lg font-medium mx-3 my-2",
          {
            "text-accent": isSelected,
            "text-primary": !isSelected,
          }
        )}
        to={to}
      >
        {children}
      </Link>
    </li>
  );
};

export const NavBar = () => {
  return (
    <div className="fixed w-full bg-base-100/75 z-20 top-0 left-0 px-5vw py-6 lg:py-8">
      <nav className="text-primary mx-auto flex max-w-[96rem] items-center justify-between">
        <div className="shrink-0">
          <Link to="/" title="Alchemist Mixology - Home" prefetch="intent">
            <img
              src="http://localhost:1337/uploads/small_small_logo_6d8d7070f6.webp"
              alt="Alchemist"
              className="h-14 md:h-16 lg:h-20 w-auto"
            />
          </Link>
        </div>
        <div className="flex items-center">
          <button className="btn btn-primary mr-5">Contact Us</button>
          <ul className="hidden lg:flex">
            {links.map(({ to, name }) => (
              <NavLink key={to} to={to}>
                {name}
              </NavLink>
            ))}
          </ul>
          <div className="flex lg:hidden">
            <button className="btn btn-circle btn-ghost">
              <Menu />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
