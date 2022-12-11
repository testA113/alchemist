import { useEffect } from "react";
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
import { NavLink } from "../shared/Actions/NavLink";
import type { ImageValues } from "../shared/types";
import { StrapiImage } from "../shared/StrapiImage";
import { LinkButton } from "../shared/Actions/LinkButton";

type MobileMenuListProps = {
  social: GetAttributesValues<"elements.socials">;
  navbarLinks: GetAttributesValues<"links.link">[];
  actionButton: GetAttributesValues<"links.link">;
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
          className="bg-base-100 z-20 block h-[100vh] pt-28 sm:w-[100vw]"
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
                  className="text-neutral-content focus:bg-base-200 border-base-200 hover:bg-base-200 px-5vw border-b py-6 uppercase transition duration-200"
                  key={to}
                  as={Link}
                  to={to}
                >
                  {text}
                </MenuLink>
              ))}
              <MenuLink
                className="btn btn-lg btn-primary mx-5vw mt-8 md:hidden"
                key={actionButton.to}
                as={Link}
                to={actionButton.to}
              >
                {actionButton.text}
              </MenuLink>
              <SocialIcons social={social} className="mt-8" />
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
  actionButton: GetAttributesValues<"links.link">;
};
const MobileMenu = ({ social, navbarLinks, actionButton }: MobileMenuProps) => {
  return (
    <Menu>
      {({ isExpanded }) => {
        return (
          <>
            <MenuButton className="btn btn-circle btn-ghost no-animation ml-5">
              {isExpanded ? <X /> : <MenuIcon />}
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
      <div className="bg-base-100/50 px-5vw fixed top-0 left-0 z-50 w-full py-2 backdrop-blur-sm lg:py-4">
        <nav className="text-primary mx-auto flex max-w-[96rem] items-center justify-between">
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
                {data.navbar.links.map((link) => (
                  <NavLink key={link.to} {...link}>
                    {link.text}
                  </NavLink>
                ))}
              </div>
              <LinkButton
                {...data.navbar.actionButton}
                className="ml-5 hidden md:flex"
              >
                {data.navbar.actionButton.text}
              </LinkButton>
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
