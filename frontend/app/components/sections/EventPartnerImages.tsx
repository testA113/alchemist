import Markdown from "markdown-to-jsx";
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
    <section className="bg-base-100 px-10vw flex w-full !max-w-full flex-col items-center pb-24">
      <div className="prose prose-lg md:prose-xl lg:prose-2xl mb-12">
        <Markdown>{sectionData.titleContent}</Markdown>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {imagesData.data.map((image, index) => (
          <StrapiImage
            key={index}
            image={image}
            className={clsx(
              "max-h-[150px] min-w-[100px] max-w-[200px] flex-[12%] rounded-2xl object-contain",
              index > 7 && "hidden md:block" // turn into carousel next
            )}
          ></StrapiImage>
        ))}
      </div>
    </section>
  );
}
