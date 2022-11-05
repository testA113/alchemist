import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";

import type { ImageValues } from "../shared/types";
import type { CarouselValues } from "./types";

type Props = {
  sectionData: CarouselValues;
};

export function Carousel({ sectionData }: Props) {
  const images = sectionData.images.data as ImageValues[];
  const [emblaRef, embla] = useEmblaCarousel({
    containScroll: "keepSnaps",
    loop: true,
  });

  return (
    <section
      className="relative bg-base-100 pb-12 items-center justify-items-center text-center overflow-x-hidden cursor-move"
      ref={emblaRef}
      aria-label="image carousel"
    >
      <div className="flex h-80 md:h-96 lg:h-[60vh]">
        {images.map((image, index) => (
          <img
            key={index}
            srcSet={clsx(
              `${ENV.STRAPI_BASEURL}${image.attributes.formats.small.url} 640w,`,
              `${ENV.STRAPI_BASEURL}${image.attributes.formats.medium.url} 768w,`,
              `${ENV.STRAPI_BASEURL}${image.attributes.formats.large.url} 1024w,`
            )}
            width={image.attributes.formats.large.width}
            height={image.attributes.formats.large.height}
            className="h-full w-auto object-cover"
            alt={image.attributes.alternativeText}
          />
        ))}
      </div>
    </section>
  );
}
