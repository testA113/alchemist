import { useEffect } from "react";
import clsx from "clsx";
import { Link, useLocation } from "@remix-run/react";
import { Menu as MenuIcon, X } from "lucide-react";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuLink,
  MenuPopover,
  useMenuButtonContext,
} from "@reach/menu-button";
import { AnimatePresence, motion } from "framer-motion";
import type { GetAttributesValues } from "@strapi/strapi";

import { SocialIcons } from "./SocialIcons";
import { Button } from "./Button";

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

const MobileMenuList = ({social}: {social: GetAttributesValues<"elements.socials">}) => {
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
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{
              duration: 0.15,
              ease: "linear",
            }}
            className="flex h-full flex-col overflow-y-scroll pb-12"
          >
            <MenuItems className="border-none bg-transparent p-0 flex flex-col focus-visible:outline-none">
              <SocialIcons
                social={social}
              />
              {links.map((link) => (
                <MenuLink
                  className="hover:bg-base-200 focus:bg-base-200 text-neutral-content border-b px-5vw py-9 border-base-200 transition duration-200"
                  key={link.to}
                  as={Link}
                  to={link.to}
                >
                  {link.name}
                </MenuLink>
              ))}
            </MenuItems>
          </motion.div>
        </MenuPopover>
      ) : null}
    </AnimatePresence>
  );
};

const MobileMenu = ({social}: {social: GetAttributesValues<"elements.socials">}) => {
  return (
    <Menu>
      {({ isExpanded }) => {
        return (
          <>
            <MenuButton className="btn btn-circle btn-ghost no-animation ml-5">
              {isExpanded ? <X /> : <MenuIcon />}
            </MenuButton>
            <MobileMenuList social={social}/>
          </>
        );
      }}
    </Menu>
  );
};

interface NavBarProps {
  data: GetAttributesValues<"api::menu.menu">;
}
export const NavBar = ({ data }: NavBarProps) => {
  const { navbar, social } = data;
  const logoPath = navbar.logo.data.attributes.url;
  return (
    <div className="fixed w-full bg-base-100/75 z-20 top-0 left-0 px-5vw py-6 lg:py-8">
      <nav className="text-primary mx-auto flex max-w-[96rem] items-center justify-between">
        <div className="shrink-0 mr-5">
          <Link to="/" title="Alchemist Mixology - Home" prefetch="intent">
            <img
              width="748"
              height="350"
              src={`${ENV.STRAPI_BASEURL}${logoPath}`}
              alt="Alchemist"
              className="h-14 md:h-16 lg:h-20 w-auto"
            />
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="hidden lg:flex">
            {navbar.links.map(({ path, text }) => (
              <NavLink key={path} to={path}>
                {text}
              </NavLink>
            ))}
          </ul>
          {navbar.actionButton && (
            <Button
              action={() => {
                console.log("click");
              }}
              mode="primary"
              size="lg"
              className="ml-5"
            >
              {navbar.actionButton.text}
            </Button>
          )}
          <div className="flex lg:hidden">
            <MobileMenu social={social} />
          </div>
        </div>
      </nav>
    </div>
  );
};
