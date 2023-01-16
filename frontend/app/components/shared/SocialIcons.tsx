import clsx from "clsx";
import { VisuallyHidden } from "reakit/VisuallyHidden";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import type { GetAttributesValues } from "@strapi/strapi";

const fallbackSocials = {
  facebookurl: "https://www.facebook.com/alchemistmixology/",
  instagramurl: "https://www.instagram.com/thealchemistmixology/",
  telephone: "+64226834889",
  email: "jaz@alchemistmixology.co.nz",
};

export const SocialIcons = ({
  social = fallbackSocials,
  className,
}: {
  social?: GetAttributesValues<"elements.socials">;
  className?: string;
}) => {
  return (
    <div
      aria-label="Alchemist mixology social media links"
      className={clsx(
        className,
        "flex w-full items-center justify-center gap-6 py-2"
      )}
    >
      <a
        aria-label="Facebook"
        href={social.facebookurl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-outline btn-primary btn-md btn-circle btn"
      >
        <VisuallyHidden>Alchemist Mixology Facebook</VisuallyHidden>
        <Facebook />
      </a>
      <a
        aria-label="Instagram"
        href={social.instagramurl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-outline btn-primary btn-md btn-circle btn"
      >
        <VisuallyHidden>Alchemist Mixology Instagram</VisuallyHidden>
        <Instagram />
      </a>
      <a
        aria-label="Email"
        href={`mailto:${social.email}?subject = Event Enquiry`}
        className="btn-outline btn-primary btn-md btn-circle btn"
      >
        <VisuallyHidden>Email Alchemist Mixology</VisuallyHidden>
        <Mail />
      </a>
      <a
        aria-label="Phone"
        href={`tel: ${social.telephone}`}
        className="btn-outline btn-primary btn-md btn-circle btn"
      >
        <VisuallyHidden>Phone Alchemist Mixology</VisuallyHidden>
        <Phone />
      </a>
    </div>
  );
};
