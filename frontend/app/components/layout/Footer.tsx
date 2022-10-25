import type { GetAttributesValues } from "@strapi/strapi";
import { Link } from "@remix-run/react";

import { SocialIcons } from "../shared/SocialIcons";
import { NavLink } from "../shared/NavLink";

interface Props {
  data: GetAttributesValues<"api::footer.footer">;
}

export const Footer = ({ data: { footer, socials } }: Props) => {
  console.log(footer.logo);
  return (
    <footer className="flex flex-col w-full items-center justify-center bg-base-100 gap-y-6 pb-6">
      <SocialIcons social={socials} />
      <Link to="/" title="Alchemist Mixology - Home" prefetch="intent">
        <img
          src={`${ENV.STRAPI_BASEURL}${footer.logo?.data.attributes.formats.small.url}`}
          alt="logo"
          width={500}
          height={234}
          className="h-32 w-auto"
        />
      </Link>
      <div className="flex items-center justify-between max-w-[96rem]">
        {footer.sitemaplinks.map(({ path, text }) => (
          <NavLink key={path} to={path}>
            {text}
          </NavLink>
        ))}
      </div>
      {/* creator link later */}
    </footer>
  );
};
