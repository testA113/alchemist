import type { GetAttributesValues } from "@strapi/strapi";
import { Link } from "@remix-run/react";

import { SocialIcons } from "../shared/SocialIcons";
import { StrapiImage } from "../shared/StrapiImage";
import type { ImageValues } from "../shared/types";
import { logo as backupLogo } from "./backup-logo-data";

interface Props {
  data?: GetAttributesValues<"api::footer.footer">;
}

export const Footer = ({ data }: Props) => {
  const imageLogo: ImageValues = data?.footer.logo?.data || backupLogo.data;
  const isBackup = !data;

  return (
    <footer className="bg-base-100 flex w-full flex-col items-center justify-center pb-6">
      <div className="flex w-full flex-col items-center justify-center gap-y-6">
        <Link to="/" title="Alchemist Mixology - Home" prefetch="intent">
          {imageLogo && (
            <StrapiImage
              image={imageLogo}
              className="h-32 w-auto object-cover"
              isBackup={isBackup}
            />
          )}
        </Link>
        <SocialIcons social={data?.socials} />
      </div>
      <Link
        to="privacy"
        prefetch="intent"
        className="link link-primary link-hover"
      >
        Privacy Policy
      </Link>
    </footer>
  );
};
