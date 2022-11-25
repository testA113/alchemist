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
import type { ImageAttributes } from "../shared/types";

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
          className="block z-20 h-[100vh] sm:w-[100vw] bg-base-100 pt-28"
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
              {navbarLinks.map(({ path, text }) => (
                <MenuLink
                  className="hover:bg-base-200 focus:bg-base-200 text-neutral-content border-b px-5vw py-9 border-base-200 transition uppercase duration-200"
                  key={path}
                  as={Link}
                  to={path}
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
                className="mt-8 mx-5vw md:hidden"
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
              <label className="btn swap swap-rotate btn-circle btn-ghost no-animation ml-5">
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
  const logo = data?.navbar.logo.data.attributes as ImageAttributes | undefined;

  return (
    <div className="transition duration-500 w-full">
      <div className="fixed w-full z-50 top-0 left-0 px-5vw py-2 lg:py-4 bg-base-100/50 backdrop-blur-sm">
        <nav className="text-primary mx-auto flex max-w-[96rem] items-center justify-between">
          <div className="shrink-0 mr-5">
            <Link to="/" title="Alchemist Mixology - Home" prefetch="intent">
              <img
                width="748"
                height="350"
                srcSet={logo && ENV ? clsx(
                  `${ENV.STRAPI_BASEURL}${logo.formats.thumbnail.url} 640w,`,
                  `${ENV.STRAPI_BASEURL}${logo.formats.small.url} 768w,`,
                  `${ENV.STRAPI_BASEURL}${logo.url} 1024w,`) :
                  // fallback logo
                  `images/small_small_logo_6d8d7070f6.webp 1024w`}
                alt="Alchemist"
                className="h-20 md:h-24 w-auto"
              />
            </Link>
          </div>
          {data && (
          <div className="flex items-center py-4">
            <div aria-label="Navigation bar links" className="hidden lg:flex">
                {data.navbar.links.map(({ path, text }) => (
                <NavLink key={path} to={path}>
                  {text}
                </NavLink>
              ))}
            </div>
            <Button
              action={() => {
                console.log("click");
              }}
                mode={data.navbar.actionButton.type}
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
