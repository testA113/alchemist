import {
  useScroll,
  useTransform,
  LazyMotion,
  domAnimation,
  m,
} from "framer-motion";
import { useRef } from "react";
import type { SectionValues } from "./types";
import { StrapiImage } from "../shared/StrapiImage";

type Props = {
  sectionData: SectionValues<"sections.image-title">;
};

export function ImageTitle({ sectionData }: Props) {
  let imageRef = useRef(null);
  let { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start start", "end start"],
  });
  let y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const image = sectionData.image.data;

  return (
    <section
      ref={imageRef}
      className="flex h-[60vh] flex-col justify-end overflow-hidden bg-transparent "
    >
      <LazyMotion features={domAnimation}>
        <m.div style={{ y }} className="absolute inset-x-0 top-0 -z-20 h-full">
          <StrapiImage
            image={image}
            className="h-[70%] min-h-[70%] min-w-full object-cover"
          />
        </m.div>
      </LazyMotion>
      <div className="pt-96">
        <div className="px-10vw from-base-100 z-20 flex flex-col items-start gap-6 bg-gradient-to-t to-transparent">
          <div className="prose-xl md:prose-2xl lg:prose-3xl relative flex w-full flex-col flex-wrap pr-24 md:w-[60%] lg:w-[50%]">
            <h2 className="font-suez !mb-4 text-white">{sectionData.title}</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
