import type { Service } from "../shared/types";

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
    <section className="py-12 px-10vw w-full flex flex-wrap !max-w-full gap-24">
      <div className="h-screen sticky top-48 prose md:prose-lg lg:prose-xl w-1/3 flex-none">
        <h1>{sectionData.title}</h1>
        <h3>{sectionData.servicesDescription}</h3>
      </div>

      <div className="h-[1500px] flex-1">
        {serviceData &&
          "data" in serviceData &&
          serviceData.data?.map((service, index) => (
            <div key={index}>{service.attributes.name}</div>
          ))}
      </div>
    </section>
  );
}
