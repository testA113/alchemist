import { Fragment, useEffect } from "react";
import { Link } from "@remix-run/react";
import { Menu as MenuIcon, X } from "lucide-react";
import {
  useMenuState,
  Menu,
  MenuItem,
  MenuButton,
  type MenuStateReturn,
} from "reakit/Menu";
import { AnimatePresence, motion } from "framer-motion";
import type { GetAttributesValues } from "@strapi/strapi";

import { SocialIcons } from "../shared/SocialIcons";
import { NavLink } from "../shared/Actions/NavLink";
import type { ImageValues } from "../shared/types";
import { StrapiImage } from "../shared/StrapiImage";
import { LinkButton } from "../shared/Actions/LinkButton";
import { logo } from "./backup-logo-data";

type MobileMenuListProps = {
  navbarLinks: GetAttributesValues<"links.link">[];
  actionButton: GetAttributesValues<"links.link">;
  social?: GetAttributesValues<"elements.socials">;
  menu: MenuStateReturn;
};

const backupNavData = {
  id: 1,
  links: [
    {
      id: 15,
      newTab: false,
      text: "Home",
      size: "md",
      to: "/",
      mode: "link",
    },
    {
      id: 3,
      newTab: false,
      text: "About Us",
      size: "md",
      to: "about-us",
      mode: "link",
    },
    {
      newTab: false,
      text: "Festival Bars",
      size: "lg",
      to: "services/festival-bars",
      mode: "link",
    },
    {
      id: 4,
      newTab: false,
      text: "Private events",
      size: "md",
      to: "services/private-events",
      mode: "link",
    },
    {
      id: 6,
      newTab: false,
      text: "Brand Action",
      size: "md",
      to: "services/brand-action",
      mode: "link",
    },
  ],
  logo,
  actionButton: {
    id: 14,
    newTab: false,
    text: "Contact Us",
    size: "lg",
    to: "contact-us",
    mode: "primary",
  },
} as GetAttributesValues<"layout.navbar">;

const MobileMenuList = ({
  social,
  navbarLinks,
  actionButton,
  menu,
}: MobileMenuListProps) => {
  useEffect(() => {
    if (menu.visible) {
      // don't use overflow-hidden, as that toggles the scrollbar and causes layout shift
      document.body.classList.add("fixed");
      document.body.classList.add("overflow-y-scroll");
      // alternatively, get bounding box of the menu, and set body height to that.
      document.body.style.height = "100vh";
      document.body.style.width = "100vw";
    } else {
      document.body.classList.remove("fixed");
      document.body.classList.remove("overflow-y-scroll");
      document.body.style.removeProperty("height");
      document.body.style.removeProperty("width");
    }
  }, [menu.visible]);
  return (
    <AnimatePresence>
      {menu.visible ? (
        <Menu
          {...menu}
          placement="top"
          aria-label="Main Menu"
          className="bg-base-100 z-20 h-[100vh] w-[100vw] !transform-none pt-28"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{
              duration: 0.15,
              ease: "linear",
            }}
            className="flex h-full flex-col pb-12"
          >
            <ul className="flex flex-col border-none bg-transparent p-0 focus-visible:outline-none">
              {navbarLinks.map(({ to, text }, index) => (
                <Fragment key={index}>
                  <MenuItem
                    className="text-neutral-content focus:bg-base-200 border-base-200 hover:bg-base-200 px-5vw border-b py-6 uppercase transition duration-200"
                    {...menu}
                    as={Link}
                    to={to}
                    prefetch="intent"
                    aria-label={text}
                    onClick={() => menu.hide()}
                  >
                    {text}
                  </MenuItem>
                </Fragment>
              ))}
              <MenuItem
                {...menu}
                as={Link}
                className="btn btn-lg btn-primary mx-5vw umami--click--contact-button mt-8 md:hidden"
                to={actionButton.to}
                aria-label={actionButton.text}
                prefetch="intent"
                onClick={() => menu.hide()}
              >
                {actionButton.text}
              </MenuItem>
              <SocialIcons social={social} className="mt-8" />
            </ul>
          </motion.div>
        </Menu>
      ) : null}
    </AnimatePresence>
  );
};

type MobileMenuProps = {
  navbarLinks: GetAttributesValues<"links.link">[];
  actionButton: GetAttributesValues<"links.link">;
  social?: GetAttributesValues<"elements.socials">;
};

const MobileMenu = ({ social, navbarLinks, actionButton }: MobileMenuProps) => {
  const menu = useMenuState({ modal: true });
  return (
    <>
      <MenuButton
        {...menu}
        className="btn btn-circle btn-ghost no-animation ml-5"
        id="menu-button"
        aria-controls="menu-options"
        aria-label="menu-button"
        role="button"
      >
        {menu.visible ? <X /> : <MenuIcon />}
      </MenuButton>
      <MobileMenuList
        menu={menu}
        social={social}
        navbarLinks={navbarLinks}
        actionButton={actionButton}
      />
    </>
  );
};

interface NavBarProps {
  data?: GetAttributesValues<"api::menu.menu">;
}
export const NavBar = ({ data }: NavBarProps) => {
  const navData = data?.navbar || backupNavData;
  const isBackup = !data;
  const logo = navData.logo.data as ImageValues;

  return (
    <div className="w-full transition duration-500">
      <div className="bg-base-100/50 px-5vw fixed top-0 left-0 z-50 w-full py-2 backdrop-blur-sm lg:py-4">
        <nav className="text-primary mx-auto flex max-w-[96rem] items-center justify-between">
          <div className="mr-5 shrink-0">
            <Link to="/" title="Alchemist Mixology - Home" prefetch="intent">
              {logo && (
                <StrapiImage
                  image={logo}
                  className="h-20 w-auto md:h-24"
                  isBackup={isBackup}
                />
              )}
            </Link>
          </div>
          {navData && (
            <div className="flex items-center py-4">
              <div
                aria-label="Navigation bar links"
                className="hidden lg:flex lg:gap-x-2"
              >
                {navData.links
                  .filter((link) => link.to !== "/") // dont include the home link in the nav bar
                  .map((link) => (
                    <NavLink key={link.to} {...link}>
                      {link.text}
                    </NavLink>
                  ))}
              </div>
              <LinkButton
                {...navData.actionButton}
                className="umami--click--contact-button ml-5 hidden md:flex"
              >
                {navData.actionButton.text}
              </LinkButton>
              <div className="flex lg:hidden">
                <MobileMenu
                  social={data?.social}
                  navbarLinks={navData.links}
                  actionButton={navData.actionButton}
                />
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};
