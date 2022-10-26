import {
  useScroll,
  useTransform,
  LazyMotion,
  domAnimation,
  m,
} from "framer-motion";
import { useRef } from "react";

import type { VideoHeroValues } from "./types";

type Props = {
  sectionData: VideoHeroValues;
};

export function VideoHero({ sectionData }: Props) {
  console.log(sectionData);
  let videoRef = useRef(null);

  let { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start start", "end start"],
  });
  let y = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  return (
    <section
      ref={videoRef}
      className="relative flex flex-col bg-transparent justify-center items-center h-[100vh] "
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
      <h1>some text</h1>
      <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-base-100 to-transparent"></div>
    </section>
  );
}
