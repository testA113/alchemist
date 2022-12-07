import clsx from "clsx";
import { ChevronRight } from "lucide-react";

import type { Service } from "../shared/types";
import { Button } from "../shared/Actions/Button";
import { ImageCard } from "../shared/ImageCard";

import type { ServicesShowcaseValues } from "./types";
import { LinkButton } from "../shared/Actions/LinkButton";

type ServiceData = {
  data: Service[];
};

type Props = {
  sectionData: ServicesShowcaseValues;
};

export function ServicesShowcase({ sectionData }: Props) {
  const serviceData = sectionData.services as ServiceData | undefined;
  return (
    <section
      className={clsx(
        "flex flex-col gap-x-24 bg-base-100",
        "w-full !max-w-full flex-wrap py-24 px-10vw md:flex-row"
      )}
    >
      <div
        className={clsx(
          "mb-8 text-center",
          "prose h-min flex-none md:sticky md:top-48 md:mb-0 md:w-1/3 md:prose-lg md:text-left lg:prose-xl"
        )}
      >
        <h1>{sectionData.title}</h1>
        <h3>{sectionData.servicesDescription}</h3>
      </div>

      <div className="flex flex-1 flex-col flex-wrap gap-y-8">
        {serviceData &&
          "data" in serviceData &&
          serviceData.data?.map((service, index) => (
            <div
              key={index}
              className="transform transition duration-300 ease-out hover:scale-105"
            >
              <ImageCard
                imageUrl={
                  service.attributes.image.data.attributes.formats?.medium.url
                }
                childClasses="px-8 py-20 bg-base-100 bg-opacity-50"
              >
                <h1 className="mb-3 text-xl font-medium text-base-content sm:text-2xl">
                  {service.attributes.name}
                </h1>
                <p className="mb-3 leading-relaxed">
                  {service.attributes.shortDescription}
                </p>
                <LinkButton
                  mode="link"
                  className="inline-flex items-center"
                  to={service.attributes.slug}
                >
                  Learn More
                  <ChevronRight />
                </LinkButton>
              </ImageCard>
            </div>
          ))}
      </div>
    </section>
  );
}
