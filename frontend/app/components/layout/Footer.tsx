import clsx from "clsx";
import type { GetAttributesValues } from "@strapi/strapi";
import { Link } from "@remix-run/react";

import { SocialIcons } from "../shared/SocialIcons";

interface Props {
  data?: GetAttributesValues<"api::footer.footer">;
}

export const Footer = ({ data }: Props) => {
  const logo = data?.footer.logo?.data.attributes;
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-y-6 bg-base-100 pb-6">
      <Link to="/" title="Alchemist Mixology - Home" prefetch="intent">
        <img
          srcSet={
            ENV && logo
              ? clsx(
                  `${ENV.STRAPI_BASEURL}${logo.formats.thumbnail.url} 640w,`,
                  `${ENV.STRAPI_BASEURL}${logo.formats.small.url} 768w,`,
                  `${ENV.STRAPI_BASEURL}${logo.url} 1024w,`
                )
              : `images/small_small_logo_6d8d7070f6.webp 1024w`
          }
          alt="logo"
          width={logo && logo.formats.small.width}
          height={logo && logo.formats.small.height}
          className="h-32 w-auto object-cover"
        />
      </Link>
      <SocialIcons social={data?.socials} />
      {/* TODO: creator link later */}
    </footer>
  );
};
