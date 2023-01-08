import { Testimonial } from "./Testimonial";
import type { SectionValues, Testimonials as TestimonialsType } from "../types";
import { CarouselWrapper } from "../../shared/CarouselWrapper";
import Markdown from "markdown-to-jsx";

type Props = {
  sectionData: SectionValues<"sections.testimonials">;
};

export const Testimonials = ({ sectionData }: Props) => {
  const testimonials = sectionData.testimonials as TestimonialsType | undefined;

  if (!testimonials || testimonials.data.length === 0) {
    return null;
  }

  if (testimonials.data.length === 1) {
    return (
      <section className="bg-base-100 px-10vw prose md:prose-lg lg:prose-xl relative max-w-none items-center justify-center py-12">
        {sectionData.header && (
          <div className="flex w-full justify-center text-center">
            <Markdown>{sectionData.header}</Markdown>
          </div>
        )}
        <Testimonial testimonial={testimonials.data[0]} />
      </section>
    );
  }

  return (
    <section className="bg-base-100 prose md:prose-lg lg:prose-xl relative max-w-none items-center justify-center py-12">
      {sectionData.header && (
        <div className="px-10vw flex w-full justify-center text-center">
          <Markdown>{sectionData.header}</Markdown>
        </div>
      )}
      <CarouselWrapper className="flex">
        {testimonials.data.map((testimonial, index) => (
          <Testimonial key={index} testimonial={testimonial} className="mx-4" />
        ))}
      </CarouselWrapper>
    </section>
  );
};
