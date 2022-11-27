import type { Service } from "../shared/types";
import { ChevronRight } from "lucide-react";

import type { ServicesShowcaseValues } from "./types";
import { Button } from "../shared/Button";
import clsx from "clsx";
import { Link } from "@remix-run/react";

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
              <Link to={service.attributes.slug}>
                <div
                  className="h-full px-8 py-20 rounded-2xl overflow-hidden text-center bg-cover bg-center transition ease-out transform duration-300 hover:opacity-90"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                  url(${ENV.STRAPI_BASEURL}${service.attributes.image.data.attributes.formats.medium.url})`,
                  }}
                >
                  <h1 className="sm:text-2xl text-xl font-medium text-base-content mb-3">
                    {service.attributes.name}
                  </h1>
                  <p className="leading-relaxed mb-3">
                    {service.attributes.shortDescription}
                  </p>
                  <Button
                    mode="link"
                    className="inline-flex items-center"
                  >
                    Learn More
                    <ChevronRight />
                  </Button>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
}
