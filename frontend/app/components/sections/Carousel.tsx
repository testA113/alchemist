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
      className="relative items-center bg-base-100 py-8"
      aria-label="Carousel section"
    >
      <div className="cursor-move overflow-x-hidden" ref={emblaRef}>
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
              className="mx-4 h-full w-auto rounded-2xl object-cover"
              alt={image.attributes.alternativeText}
            />
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 left-5vw -translate-y-1/2 md:left-20">
        <Button
          action={scrollPrev}
          className="btn-ghost btn-active btn-circle md:btn-lg lg:btn-outline"
          aria-label="previous image"
        >
          <ChevronLeft />
        </Button>
      </div>
      <div className="absolute top-1/2 right-5vw -translate-y-1/2 md:right-20">
        <Button
          action={scrollNext}
          className="btn-ghost btn-active btn-circle md:btn-lg lg:btn-outline"
          aria-label="next image"
        >
          <ChevronRight />
        </Button>
      </div>
    </section>
  );
}
