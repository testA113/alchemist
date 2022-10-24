import { VisuallyHidden } from "@reach/visually-hidden";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import type { GetAttributesValues } from "@strapi/strapi";

export const SocialIcons = ({
  social,
}: {
  social: GetAttributesValues<"elements.socials">;
}) => {
  return (
    <div className="flex w-full items-center justify-center gap-6 py-2">
      <a
        href={social.facebookurl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary btn-circle btn-outline btn-md"
      >
        <VisuallyHidden>Alchemist Mixology Facebook</VisuallyHidden>
        <Facebook />
      </a>
      <a
        href={social.instagramurl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary btn-circle btn-outline btn-md"
      >
        <VisuallyHidden>Alchemist Mixology Instagram</VisuallyHidden>
        <Instagram />
      </a>
      <a
        href={`mailto:${social.email}?subject = Event Enquiry`}
        className="btn btn-primary btn-circle btn-outline btn-md"
      >
        <VisuallyHidden>Email Alchemist Mixology</VisuallyHidden>
        <Mail />
      </a>
      <a
        href={`tel: ${social.telephone}`}
        className="btn btn-primary btn-circle btn-outline btn-md"
      >
        <VisuallyHidden>Phone Alchemist Mixology</VisuallyHidden>
        <Phone />
      </a>
    </div>
  );
};
