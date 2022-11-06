import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
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
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const scrollTo = useCallback(
    (index: number) => embla && embla.scrollTo(index),
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnDisabled(!embla.canScrollPrev());
    setNextBtnDisabled(!embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    // setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, onSelect]);

  return (
    <section
      className="relative bg-base-100 items-center"
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
              className="h-full w-auto object-cover"
              alt={image.attributes.alternativeText}
            />
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 left-5vw md:left-20">
        <Button
          action={scrollPrev}
          disabled={prevBtnDisabled}
          className="btn-circle btn-ghost btn-active"
        >
          <ChevronLeft />
        </Button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-5vw md:right-20">
        <Button
          action={scrollNext}
          disabled={nextBtnDisabled}
          className="btn-circle btn-ghost btn-active"
        >
          <ChevronRight />
        </Button>
      </div>
    </section>
  );
}
