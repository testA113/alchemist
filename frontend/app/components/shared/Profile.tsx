import type { StrapiData } from "~/types";
import { StrapiImage } from "./StrapiImage";
import { User } from "lucide-react";
import { Button } from "./Actions/Button";
import { clsx } from "clsx";

type Props = {
  client: StrapiData<"api::client.client">;
  className?: string;
};

export const Profile = ({ client, className = "column" }: Props) => {
  const { image, websiteLink, name } = client.data.attributes;

  const renderProfile = () => (
    <div
      className={clsx(
        "card bg-base-200 flex items-center gap-y-2 gap-x-4 rounded-2xl p-6 transition-colors duration-300 ease-in-out",
        websiteLink && "hover:bg-base-300",
        className
      )}
    >
      {image.data ? (
        <StrapiImage
          image={image.data}
          title={name}
          className="!m-0 h-16 w-auto object-contain"
        />
      ) : (
        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl">
          <User size={64} />
        </div>
      )}
      <div className="flex w-full items-center justify-around gap-y-2 gap-x-4">
        <h4 className="!my-4 flex !no-underline">{name}</h4>
        {websiteLink && (
          <Button
            type="button"
            mode="default"
            icon="ChevronRight"
            className="btn-circle btn-outline transform duration-300 ease-in-out hover:translate-x-1"
            id={`${name}-profile-external-website-button`}
          />
        )}
      </div>
    </div>
  );

  return websiteLink ? (
    <a href={websiteLink} target="_blank" rel="noopener noreferrer">
      <label
        htmlFor={`${name}-profile-external-website-button`}
        className="hover:cursor-pointer"
      >
        {renderProfile()}
      </label>
    </a>
  ) : (
    renderProfile()
  );
};
