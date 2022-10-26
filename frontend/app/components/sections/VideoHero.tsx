import {
  useScroll,
  useTransform,
  LazyMotion,
  domAnimation,
  m,
} from "framer-motion";
import { useRef } from "react";

import { Button } from "~/components/shared/Button";

import type { VideoHeroValues } from "./types";

type Props = {
  sectionData: VideoHeroValues;
};

export function VideoHero({ sectionData }: Props) {
  let videoRef = useRef(null);

  let { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start start", "end start"],
  });
  let y = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  const sentenceEndings = sectionData.cyclingsentence
    .sentenceendings as string[];

  return (
    <section
      ref={videoRef}
      className="flex flex-col justify-end bg-transparent h-[100vh] pb-20"
    >
      <LazyMotion features={domAnimation}>
        <m.div
          style={{ y }}
          className="absolute inset-x-0 top-0 -z-20 h-full mx-auto w-full overflow-hidden"
        >
          <iframe
            title={sectionData.videoname}
            src={sectionData.videourl}
            loading="lazy"
            scrolling="no"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full aspect-video object-cover"
          ></iframe>
        </m.div>
      </LazyMotion>
      <div className="flex flex-col md:flex-row gap-6 px-5vw z-20 items-center md:items-end">
        <div className="prose-xl lg:prose-2xl w-full flex flex-col flex-wrap pr-24 md:pr-[50%] lg:pr-[60%]">
          <h1 className="text-white">
            {sectionData.cyclingsentence.sentencestart}
          </h1>
          <h1 className="italic">{sentenceEndings[0]}</h1>
        </div>
        <div>
          <Button
            className="btn btn-primary h-16 w-36 text-lg"
            action={() => console.log("contact")}
          >
            Contact Us
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 h-2/3 w-full bg-gradient-to-t from-base-100 to-transparent"></div>
    </section>
  );
}
