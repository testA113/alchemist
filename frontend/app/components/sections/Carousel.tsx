import type { ImageValues } from "../shared/types";
import type { SectionValues } from "./types";
import { StrapiImage } from "../shared/StrapiImage";
import { CarouselWrapper } from "../shared/CarouselWrapper";

type Props = {
  sectionData: SectionValues<"sections.full-size-carousel">;
};

export function Carousel({ sectionData }: Props) {
  const images = sectionData.images.data as ImageValues[];
  return (
    <section
      className="bg-base-100 relative items-center"
      aria-label="Carousel section"
    >
      <CarouselWrapper>
        {images.map((image, index) => (
          <StrapiImage
            image={image}
            key={index}
            className="mx-4 h-full w-auto rounded-2xl object-cover"
          />
        ))}
      </CarouselWrapper>
    </section>
  );
}
