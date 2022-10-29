import clsx from "clsx";
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

  const fallBackImage = sectionData.fallbackImage.data.attributes;
  console.log(sectionData);

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
          className="absolute inset-x-0 top-0 -z-20 h-full mx-auto overflow-hidden"
        >
          <iframe
            title={sectionData.videoname}
            src={sectionData.videourl}
            loading="lazy"
            scrolling="no"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            className="hidden md:block lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full aspect-video object-cover"
          ></iframe>
          <img
            src={sectionData.fallbackImage}
            alt="Showcase"
            srcSet={clsx(
              `${ENV.STRAPI_BASEURL}${fallBackImage.formats.small.url} 640w,`,
              `${ENV.STRAPI_BASEURL}${fallBackImage.formats.medium.url} 768w,`,
              `${ENV.STRAPI_BASEURL}${fallBackImage.formats.large.url} 1024w,`
            )}
            className="block md:hidden lg:hidden object-cover w-full h-full"
          />
        </m.div>
      </LazyMotion>
      <div className="flex flex-col md:flex-row gap-6 px-5vw z-20 items-center md:items-end">
        <div className="prose-xl lg:prose-2xl w-full flex flex-col flex-wrap pr-24 md:w-[55%] lg:w-[45%]">
          <h1 className="text-white">
            {sectionData.cyclingsentence.sentencestart}
          </h1>
          <h1 className="italic md:!mb-0">{sentenceEndings[0]}</h1>
        </div>
        <div className="md:ml-12 flex md:flex-col">
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
