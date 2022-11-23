import type { Service } from "../shared/types";
import { ChevronRight } from "lucide-react";

import type { ServicesShowcaseValues } from "./types";
import { Button } from "../shared/Button";
import clsx from "clsx";

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
        "flex flex-col",
        "py-24 px-10vw w-full md:flex-row flex-wrap !max-w-full gap-24"
      )}
    >
      <div
        className={clsx(
          "text-center",
          "md:sticky h-min md:top-48 md:text-left prose md:prose-lg lg:prose-xl md:w-1/3 flex-none"
        )}
      >
        <h1>{sectionData.title}</h1>
        <h3>{sectionData.servicesDescription}</h3>
      </div>

      <div className="flex-1 flex flex-col flex-wrap gap-y-8">
        {serviceData &&
          "data" in serviceData &&
          serviceData.data?.map((service, index) => (
            // <div key={index}>{service.attributes.name}</div>
            <div key={index}>
              <div className="h-full bg-base-200 bg-opacity-75 px-8 py-20 rounded-2xl overflow-hidden text-center relative">
                <h1 className="title-font sm:text-2xl text-xl font-medium text-base-content mb-3">
                  {service.attributes.name}
                </h1>
                <p className="leading-relaxed mb-3">
                  {service.attributes.shortDescription}
                </p>
                <Button
                  action={`/${service.attributes.slug}`}
                  mode="link"
                  className="inline-flex items-center"
                >
                  Learn More
                  <ChevronRight />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
