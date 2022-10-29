import clsx from "clsx";
import type { GetAttributesValues } from "@strapi/strapi";
import { Link } from "@remix-run/react";

import { SocialIcons } from "../shared/SocialIcons";

interface Props {
  data: GetAttributesValues<"api::footer.footer">;
}

export const Footer = ({ data: { footer, socials } }: Props) => {
  const logo = footer.logo?.data.attributes;
  return (
    <footer className="flex flex-col w-full items-center justify-center bg-base-100 gap-y-6 pb-6">
      <Link to="/" title="Alchemist Mixology - Home" prefetch="intent">
        <img
          srcSet={clsx(
            `${ENV.STRAPI_BASEURL}${logo.formats.thumbnail.url} 640w,`,
            `${ENV.STRAPI_BASEURL}${logo.formats.small.url} 768w,`,
            `${ENV.STRAPI_BASEURL}${logo.url} 1024w,`
          )}
          alt="logo"
          width={logo.formats.small.width}
          height={logo.formats.small.height}
          className="h-32 w-auto object-cover"
        />
      </Link>
      <SocialIcons social={socials} />
      {/* TODO: creator link later */}
    </footer>
  );
};
