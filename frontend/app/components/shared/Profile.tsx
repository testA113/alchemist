import type { GetAttributesValues } from "@strapi/strapi";

import type { StrapiData } from "~/types";
import { StrapiImage } from "./StrapiImage";
import { User } from "lucide-react";
import { Button } from "./Actions/Button";

type Props = {
  client: StrapiData<GetAttributesValues<"api::client.client">>;
};

export const Profile = ({ client }: Props) => {
  const { image, websiteLink, name } = client.data.attributes;

  const renderProfile = () => (
    <div className="card bg-base-200 hover:bg-base-300 flex flex-col items-center gap-2 rounded-2xl p-6 transition-colors duration-300 ease-in-out">
      {image.data ? (
        <StrapiImage
          image={image.data}
          title={name}
          className="!m-0 h-16 w-auto"
        />
      ) : (
        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl">
          <User size={64} />
        </div>
      )}
      <div className="flex w-full items-center justify-around gap-2">
        <h4 className="!my-4 flex !no-underline">{name}</h4>
        {websiteLink && (
          <Button
            type="button"
            mode="default"
            icon="ChevronRight"
            className="btn-circle btn-outline transform duration-300 ease-in-out hover:translate-x-1"
            id="linkButton"
          />
        )}
      </div>
    </div>
  );

  return websiteLink ? (
    <a href={websiteLink} target="_blank" rel="noopener noreferrer">
      <label htmlFor="linkButton" className="hover:cursor-pointer">
        {renderProfile()}
      </label>
    </a>
  ) : (
    renderProfile()
  );
};
