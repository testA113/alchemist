import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "../shared/Actions/Button";

type Props = {
  children: React.ReactNode[];
  className?: string;
};

export function CarouselWrapper({ children, className }: Props) {
  const classes = className || "flex h-80 items-center md:h-96 lg:h-[60vh]";

  const [emblaRef, embla] = useEmblaCarousel({
    containScroll: "keepSnaps",
    loop: true,
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  return (
    <div>
      <div
        className="cursor-grab overflow-x-hidden active:cursor-grabbing"
        ref={emblaRef}
      >
        <div className={classes}>{children}</div>
      </div>
      <div className="left-5vw absolute top-1/2 -translate-y-1/2 md:left-20">
        <Button
          type="button"
          onClick={scrollPrev}
          className="btn-ghost btn-active btn-circle md:btn-lg lg:btn-outline"
          aria-label="previous image"
        >
          <ChevronLeft />
        </Button>
      </div>
      <div className="right-5vw absolute top-1/2 -translate-y-1/2 md:right-20">
        <Button
          type="button"
          onClick={scrollNext}
          className="btn-ghost btn-active btn-circle md:btn-lg lg:btn-outline"
          aria-label="next image"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
