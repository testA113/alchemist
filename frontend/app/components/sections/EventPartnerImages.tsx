import clsx from "clsx";

import type { ImagesData } from "../shared/types";
import { StrapiImage } from "../shared/StrapiImage";

import type { EventPartnersValues } from "./types";

type Props = {
  sectionData: EventPartnersValues;
};

// react component with a 3x2 grid of images that can be horizontally scrolled using embla-carousel
export function EventPartnerImages({ sectionData }: Props) {
  const imagesData = sectionData.partnerImage as ImagesData;
  return (
    <section
      className={clsx(
        "flex flex-col bg-base-100",
        "w-full !max-w-full items-center pb-24 px-10vw"
      )}
    >
      <div className="prose mb-12 md:prose-lg lg:prose-xl">
        <h1>{sectionData.title}</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {imagesData.data.map((image, index) => (
          <StrapiImage
            key={index}
            image={image}
            className={clsx(
              "object-contain min-w-[100px] max-w-[200px] max-h-[150px] flex-[12%] rounded-2xl",
              index > 7 && "hidden md:block" // turn into carousel next
            )}
          ></StrapiImage>
        ))}
      </div>
    </section>
  );
}
