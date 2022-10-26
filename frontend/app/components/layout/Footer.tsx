import type { GetAttributesValues } from "@strapi/strapi";
import { Link } from "@remix-run/react";

import { SocialIcons } from "../shared/SocialIcons";
import { NavLink } from "../shared/NavLink";

interface Props {
  data: GetAttributesValues<"api::footer.footer">;
}

export const Footer = ({ data: { footer, socials } }: Props) => {
  const logo = footer.logo?.data.attributes.formats.small;
  return (
    <footer className="flex flex-col w-full items-center justify-center bg-base-100 gap-y-6 pb-6">
      <Link to="/" title="Alchemist Mixology - Home" prefetch="intent">
        <img
          src={`${ENV.STRAPI_BASEURL}${logo.url}`}
          alt="logo"
          width={logo.width}
          height={logo.height}
          className="h-32 w-auto object-cover"
        />
      </Link>
      <SocialIcons social={socials} />
      {/* TODO: creator link later */}
    </footer>
  );
};
