import type { GetAttributesValues } from "@strapi/strapi";

import { SocialIcons } from "../shared/SocialIcons";

interface Props {
  data: GetAttributesValues<"api::footer.footer">;
}

export const Footer = ({ data }: Props) => {
  return (
    <footer className="flex flex-col w-full items-center justify-center bg-base-100 pb-6">
      <SocialIcons social={data.socials} />
      {/* more to come */}
    </footer>
  );
};
