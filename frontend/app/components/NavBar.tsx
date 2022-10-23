import { useEffect } from "react";
import clsx from "clsx";
import { Link, useLocation } from "@remix-run/react";
import {
  Menu as MenuIcon,
  X,
  Facebook,
  Instagram,
  Mail,
  Phone,
} from "lucide-react";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  MenuLink,
  MenuPopover,
  useMenuButtonContext,
} from "@reach/menu-button";
import { VisuallyHidden } from "@reach/visually-hidden";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useReducedMotion,
} from "framer-motion";

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

const MobileMenuList = () => {
  const { isExpanded } = useMenuButtonContext();

  useEffect(() => {
    if (isExpanded) {
      // don't use overflow-hidden, as that toggles the scrollbar and causes layout shift
      document.body.classList.add("fixed");
      document.body.classList.add("overflow-y-scroll");
      // alternatively, get bounding box of the menu, and set body height to that.
      document.body.style.height = "100vh";
    } else {
      document.body.classList.remove("fixed");
      document.body.classList.remove("overflow-y-scroll");
      document.body.style.removeProperty("height");
    }
  }, [isExpanded]);

  return (
    <AnimatePresence>
      {isExpanded ? (
        <MenuPopover
          position={(r) => ({
            top: `calc(${Number(r?.top) + Number(r?.height)}px + 2.25rem)`, // 2.25 rem = py-9 from navbar
            left: 0,
            bottom: 0,
            right: 0,
          })}
          style={{ display: "block" }}
          className="z-50 w-full"
        >
          <MenuItems className="border-none bg-transparent p-0 flex flex-col focus-visible:outline-none">
            <li className="flex w-full items-center justify-center gap-6 py-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-circle btn-outline btn-md"
              >
                <VisuallyHidden>Alchemist Mixology Facebook</VisuallyHidden>
                <Facebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-circle btn-outline btn-md"
              >
                <VisuallyHidden>Alchemist Mixology Instagram</VisuallyHidden>
                <Instagram />
              </a>
              <a
                href="mailto:aliharriss1995@gmail.com?subject = Event Enquiry"
                className="btn btn-primary btn-circle btn-outline btn-md"
              >
                <VisuallyHidden>Email Alchemist Mixology</VisuallyHidden>
                <Mail />
              </a>
              <a
                href="tel: +64204439254"
                className="btn btn-primary btn-circle btn-outline btn-md"
              >
                <VisuallyHidden>Phone Alchemist Mixology</VisuallyHidden>
                <Phone />
              </a>
            </li>
            {links.map((link) => (
              <MenuLink
                className="hover:bg-base-200 focus:bg-base-200 text-primary border-b px-5vw py-9 border-base-200 transition duration-200"
                key={link.to}
                as={Link}
                to={link.to}
              >
                {link.name}
              </MenuLink>
            ))}
          </MenuItems>
        </MenuPopover>
      ) : null}
    </AnimatePresence>
  );
};

const MobileMenu = () => {
  return (
    <Menu>
      {({ isExpanded }) => {
        return (
          <>
            <MenuButton className="btn btn-circle btn-ghost">
              {isExpanded ? <X /> : <MenuIcon />}
            </MenuButton>
            <MobileMenuList />
          </>
        );
      }}
    </Menu>
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
            <MobileMenu />
          </div>
        </div>
      </nav>
    </div>
  );
};
