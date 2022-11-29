import type { GetAttributesValues } from "@strapi/strapi";
import { Link } from "@remix-run/react";

import { SocialIcons } from "../shared/SocialIcons";
import { StrapiImage } from "../shared/StrapiImage";
import type { ImageValues } from "../shared/types";

interface Props {
  data?: GetAttributesValues<"api::footer.footer">;
}

export const Footer = ({ data }: Props) => {
  const logo = data?.footer.logo?.data as ImageValues | undefined;
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-y-6 bg-base-100 pb-6">
      <Link to="/" title="Alchemist Mixology - Home" prefetch="intent">
        {logo && (
          <StrapiImage image={logo} className="h-32 w-auto object-cover" />
        )}
      </Link>
      <SocialIcons social={data?.socials} />
    </footer>
  );
};
