import { VisuallyHidden } from "@reach/visually-hidden";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

interface Props {
  facebookUrl: string;
  instagramUrl: string;
  email: string;
  phone: string;
}

export const SocialIcons = ({
  facebookUrl,
  instagramUrl,
  email,
  phone,
}: Props) => {
  return (
    <div className="flex w-full items-center justify-center gap-6 py-2">
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary btn-circle btn-outline btn-md"
      >
        <VisuallyHidden>Alchemist Mixology Facebook</VisuallyHidden>
        <Facebook />
      </a>
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary btn-circle btn-outline btn-md"
      >
        <VisuallyHidden>Alchemist Mixology Instagram</VisuallyHidden>
        <Instagram />
      </a>
      <a
        href={`mailto:${email}?subject = Event Enquiry`}
        className="btn btn-primary btn-circle btn-outline btn-md"
      >
        <VisuallyHidden>Email Alchemist Mixology</VisuallyHidden>
        <Mail />
      </a>
      <a
        href={`tel: ${phone}`}
        className="btn btn-primary btn-circle btn-outline btn-md"
      >
        <VisuallyHidden>Phone Alchemist Mixology</VisuallyHidden>
        <Phone />
      </a>
    </div>
  );
};
