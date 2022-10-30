import clsx from "clsx";
import {
  useScroll,
  useTransform,
  LazyMotion,
  domAnimation,
  m,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { Button } from "~/components/shared/Button";

import type { VideoHeroValues } from "./types";

type Props = {
  sectionData: VideoHeroValues;
};

export function VideoHero({ sectionData }: Props) {
  let videoRef = useRef(null);
  let [showVideo, setShowVideo] = useState(false);
  console.log("showVideo: ", showVideo);
  let { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start start", "end start"],
  });
  let y = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  const fallBackImage = sectionData.fallbackImage.data.attributes;
  const loadingBackgroundImage =
    sectionData.loadingBackgroundImage.data.attributes;

  const sentenceEndings = sectionData.cyclingSentence
    .sentenceendings as string[];

  const { primaryButton, link } = sectionData;

  // useeffect run a function once after a delay of 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

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
          {/* for large screens */}
          {showVideo ? (
            <iframe
              title={sectionData.videoName}
              src={sectionData.videoUrl}
              loading="eager"
              scrolling="no"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              className="hidden md:block lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full aspect-video object-cover"
            ></iframe>
          ) : (
            <img
              onLoad={() => {
                console.log("loaded");
                setShowVideo(true);
              }}
              srcSet={clsx(
                `${ENV.STRAPI_BASEURL}${loadingBackgroundImage.formats.small.url} 640w,`,
                `${ENV.STRAPI_BASEURL}${loadingBackgroundImage.formats.medium.url} 768w,`,
                `${ENV.STRAPI_BASEURL}${loadingBackgroundImage.formats.large.url} 1024w,`
              )}
              alt="Thumbnail"
              className="hidden md:block object-cover w-full h-full"
            />
          )}
          {/* for small screens */}
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
      <div className="flex flex-col gap-6 px-5vw z-20 items-start">
        <div className="prose-xl lg:prose-2xl w-full flex flex-col flex-wrap pr-24 md:w-[60%] lg:w-[50%]">
          <h1 className="text-white !mb-6">
            {sectionData.cyclingSentence.sentencestart}
          </h1>
          <h1 className="italic">{sentenceEndings[0]}</h1>
        </div>
        <div className="w-full flex justify-center md:justify-start gap-6">
          {primaryButton && (
            <Button
              aria-label={primaryButton.text}
              className="btn btn-primary md:btn-wide"
              size="lg"
              action={primaryButton.function || primaryButton.url || ""}
            >
              {primaryButton.text}
            </Button>
          )}
          {link && (
            <Button
              aria-label={link.text}
              action={link.url || ""}
              mode={link.type}
              size={link.size}
            >
              {link.text}
            </Button>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 h-2/3 w-full bg-gradient-to-t from-base-100 to-transparent"></div>
    </section>
  );
}