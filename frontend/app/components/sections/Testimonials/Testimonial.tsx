import { clsx } from "clsx";
import { Quote } from "lucide-react";
import { type Testimonial as TestimonialType } from "../types";
import { Profile } from "~/components/shared/Profile";
import Markdown from "markdown-to-jsx";

type Props = {
  testimonial: TestimonialType;
  className?: string;
};

export const Testimonial = ({ testimonial, className }: Props) => {
  return (
    <div
      className={clsx(
        "bg-base-200 flex h-min flex-col items-start justify-start rounded-2xl p-12",
        className
      )}
    >
      <Quote size={48} className="top-0 left-0 flex-shrink-0" />
      <div className="flex min-w-[50vw] flex-col items-center justify-center rounded-2xl">
        <Markdown className="mb-4 w-full">
          {testimonial.attributes.testimonial}
        </Markdown>
        <Profile
          className="flex-col md:flex-row lg:flex-row"
          client={testimonial.attributes.client}
        />
      </div>
    </div>
  );
};
