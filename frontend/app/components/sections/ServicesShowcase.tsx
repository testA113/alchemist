import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { Link } from "@remix-run/react";

import type { Service } from "../shared/types";
import { Button } from "../shared/Button";
import { ImageCard } from '../shared/ImageCard'

import type { ServicesShowcaseValues } from "./types";

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
        "bg-base-100 flex flex-col gap-x-24",
        "py-24 px-10vw w-full md:flex-row flex-wrap !max-w-full"
      )}
    >
      <div
        className={clsx(
          "text-center mb-8",
          "md:mb-0 md:sticky h-min md:top-48 md:text-left prose md:prose-lg lg:prose-xl md:w-1/3 flex-none"
        )}
      >
        <h1>{sectionData.title}</h1>
        <h3>{sectionData.servicesDescription}</h3>
      </div>

      <div className="flex-1 flex flex-col flex-wrap gap-y-8">
        {serviceData &&
          "data" in serviceData &&
          serviceData.data?.map((service, index) => (
            <div
              key={index}
              className="transition ease-out transform duration-300 hover:scale-105"
            >
              <ImageCard imageUrl={service.attributes.image.data.attributes.formats.medium.url} childClasses="px-8 py-20 bg-base-100 bg-opacity-50">
                  <h1 className="sm:text-2xl text-xl font-medium text-base-content mb-3">
                    {service.attributes.name}
                  </h1>
                  <p className="leading-relaxed mb-3">
                    {service.attributes.shortDescription}
                  </p>
                  <Button
                    mode="link"
                    className="inline-flex items-center"
                  action={service.attributes.slug}
                  >
                    Learn More
                    <ChevronRight />
                  </Button>
              </ImageCard>
            </div>
          ))}
      </div>
    </section>
  );
}
