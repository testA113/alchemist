import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "../shared/Button";
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
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  return (
    <section
      className="relative bg-base-100 items-center py-8"
      aria-label="Carousel section"
    >
      <div className="overflow-x-hidden cursor-move" ref={emblaRef}>
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
              className="h-full w-auto object-cover mx-4 rounded-2xl"
              alt={image.attributes.alternativeText}
            />
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 left-5vw md:left-20">
        <Button
          action={scrollPrev}
          className="btn-circle btn-ghost btn-active lg:btn-outline md:btn-lg"
          aria-label="previous image"
        >
          <ChevronLeft />
        </Button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-5vw md:right-20">
        <Button
          action={scrollNext}
          className="btn-circle btn-ghost btn-active lg:btn-outline md:btn-lg"
          aria-label="next image"
        >
          <ChevronRight />
        </Button>
      </div>
    </section>
  );
}
