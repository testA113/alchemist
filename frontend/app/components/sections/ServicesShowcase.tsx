import { ChevronRight } from "lucide-react";
import Markdown from "markdown-to-jsx";

import type { Service } from "../shared/types";
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
    <section className="bg-base-100 px-10vw prose prose-lg md:prose-xl lg:prose-2xl flex w-full !max-w-full flex-col flex-wrap gap-x-24 py-24 md:flex-row">
      <div className="mb-8 h-min flex-none text-center md:sticky md:top-48 md:mb-0 md:w-1/3 md:text-left">
        <Markdown>{sectionData.titleContent}</Markdown>
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
                <h3 className="font-suez text-base-content mb-3 text-xl font-medium sm:text-2xl">
                  {service.attributes.name}
                </h3>
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
