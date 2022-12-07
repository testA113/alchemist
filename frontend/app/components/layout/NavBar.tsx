import { useEffect } from "react";
import clsx from "clsx";
import { Link } from "@remix-run/react";
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

import { SocialIcons } from "../shared/SocialIcons";
import { NavLink } from "../shared/NavLink";
import { Button } from "../shared/Button";
import type { ImageValues } from "../shared/types";
import { StrapiImage } from "../shared/StrapiImage";

type MobileMenuListProps = {
  social: GetAttributesValues<"elements.socials">;
  navbarLinks: GetAttributesValues<"links.link">[];
  actionButton: GetAttributesValues<"links.button">;
};
const MobileMenuList = ({
  social,
  navbarLinks,
  actionButton,
}: MobileMenuListProps) => {
  const { isExpanded } = useMenuButtonContext();

  useEffect(() => {
    if (isExpanded) {
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
  }, [isExpanded]);
  return (
    <AnimatePresence>
      {isExpanded ? (
        <MenuPopover
          position={() => ({
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          })}
          className="z-20 block h-[100vh] bg-base-100 pt-28 sm:w-[100vw]"
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
            <MenuItems className="flex flex-col border-none bg-transparent p-0 focus-visible:outline-none">
              {navbarLinks.map(({ to, text }) => (
                <MenuLink
                  className="border-b border-base-200 px-5vw py-9 uppercase text-neutral-content transition duration-200 hover:bg-base-200 focus:bg-base-200"
                  key={to}
                  as={Link}
                  to={to}
                >
                  {text}
                </MenuLink>
              ))}
              <SocialIcons social={social} className="mt-8" />
              <Button
                action={() => {
                  console.log("click");
                }}
                mode="primary"
                size="lg"
                className="mx-5vw mt-8 md:hidden"
              >
                {actionButton.text}
              </Button>
            </MenuItems>
          </motion.div>
        </MenuPopover>
      ) : null}
    </AnimatePresence>
  );
};

type MobileMenuProps = {
  social: GetAttributesValues<"elements.socials">;
  navbarLinks: GetAttributesValues<"links.link">[];
  actionButton: GetAttributesValues<"links.button">;
};
const MobileMenu = ({ social, navbarLinks, actionButton }: MobileMenuProps) => {
  return (
    <Menu>
      {() => {
        return (
          <>
            <MenuButton aria-label="menu button">
              <label className="swap btn-ghost swap-rotate no-animation btn-circle btn ml-5">
                <input type="checkbox" aria-label="toggle  menu" />
                <X className="swap-on" />
                <MenuIcon className="swap-off" />
              </label>
            </MenuButton>
            <MobileMenuList
              social={social}
              navbarLinks={navbarLinks}
              actionButton={actionButton}
            />
          </>
        );
      }}
    </Menu>
  );
};

interface NavBarProps {
  data?: GetAttributesValues<"api::menu.menu">;
}
export const NavBar = ({ data }: NavBarProps) => {
  const logo = data?.navbar.logo.data as ImageValues | undefined;

  return (
    <div className="w-full transition duration-500">
      <div className="fixed top-0 left-0 z-50 w-full bg-base-100/50 px-5vw py-2 backdrop-blur-sm lg:py-4">
        <nav className="mx-auto flex max-w-[96rem] items-center justify-between text-primary">
          <div className="mr-5 shrink-0">
            <Link to="/" title="Alchemist Mixology - Home" prefetch="intent">
              {logo && (
                <StrapiImage image={logo} className="h-20 w-auto md:h-24" />
              )}
            </Link>
          </div>
          {data && (
            <div className="flex items-center py-4">
              <div aria-label="Navigation bar links" className="hidden lg:flex">
                {data.navbar.links.map(({ to, text }) => (
                  <NavLink key={to} to={to}>
                    {text}
                  </NavLink>
                ))}
              </div>
              <Button
                action={() => {
                  console.log("click");
                }}
                mode={data.navbar.actionButton.mode}
                type={data.navbar.actionButton.type}
                size={data.navbar.actionButton.size}
                className="ml-5 hidden md:block"
              >
                {data.navbar.actionButton.text}
              </Button>
              <div className="flex lg:hidden">
                <MobileMenu
                  social={data.social}
                  navbarLinks={data.navbar.links}
                  actionButton={data.navbar.actionButton}
                />
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};
