import clsx from "clsx";
import {
  useScroll,
  useTransform,
  LazyMotion,
  domAnimation,
  m,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { Button } from "~/components/shared/Actions/Button";
import { LinkButton } from "../shared/Actions/LinkButton";

import type { VideoHeroValues } from "./types";

type Props = {
  sectionData: VideoHeroValues;
};

export function VideoHero({ sectionData }: Props) {
  let bottomRef = useRef<null | HTMLDivElement>(null);
  let videoRef = useRef(null);
  let [showVideo, setShowVideo] = useState(false);
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
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const scrollDown = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={videoRef}
      className="flex h-[100vh] flex-col justify-end bg-transparent pb-24"
    >
      <LazyMotion features={domAnimation}>
        <m.div
          style={{ y }}
          className="absolute inset-x-0 top-0 -z-20 mx-auto h-full overflow-hidden"
        >
          {/* for large screens */}
          {showVideo ? (
            <iframe
              title={sectionData.videoName}
              src={sectionData.videoUrl}
              aria-hidden
              loading="eager"
              allow="autoplay; fullscreen; picture-in-picture"
              className="absolute top-1/2 left-1/2 hidden aspect-video min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover md:block lg:block"
            ></iframe>
          ) : (
            <img
              srcSet={clsx(
                `${ENV.STRAPI_BASEURL}${loadingBackgroundImage.formats.small.url} 640w,`,
                `${ENV.STRAPI_BASEURL}${loadingBackgroundImage.formats.medium.url} 768w,`,
                `${ENV.STRAPI_BASEURL}${loadingBackgroundImage.formats.large.url} 1024w,`
              )}
              alt="Thumbnail"
              className="hidden h-full w-full object-cover md:block"
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
            className="block h-full w-full object-cover md:hidden lg:hidden"
          />
        </m.div>
      </LazyMotion>
      <div className="px-10vw z-20 flex flex-col items-start gap-6">
        <div className="prose-xl md:prose-2xl lg:prose-3xl relative flex w-full flex-col flex-wrap pr-24 md:w-[60%] lg:w-[50%]">
          <h2 className="font-suez !mb-4 text-white">
            {sectionData.cyclingSentence.sentencestart}
          </h2>
          <h2 className="font-suez !mb-32 italic">
            <div className="inline min-h-max">
              {sentenceEndings.map((sentenceEnding, index) => (
                <span
                  className={clsx(
                    "absolute min-h-max opacity-0",
                    "[&:nth-child(1)]:animate-[rotateword_16s_ease-out_infinite]",
                    "[&:nth-child(2)]:animate-[rotateword_16s_ease-out_infinite_4s]",
                    "[&:nth-child(3)]:animate-[rotateword_16s_ease-out_infinite_8s]",
                    "[&:nth-child(4)]:animate-[rotateword_16s_ease-out_infinite_12s]"
                  )}
                  key={index}
                >
                  {sentenceEnding}
                </span>
              ))}
            </div>
          </h2>
        </div>
        <div className="flex w-full justify-center gap-6 md:justify-start">
          {primaryButton && (
            <LinkButton {...primaryButton} className="md:btn-wide">
              {primaryButton.text}
            </LinkButton>
          )}
          {link && (
            <Button {...link} onClick={() => scrollDown()}>
              {link.text}
            </Button>
          )}
        </div>
      </div>
      <div className="from-base-100 absolute bottom-0 h-2/3 w-full bg-gradient-to-t to-transparent"></div>
      <div className="absolute bottom-0" ref={bottomRef} />
    </section>
  );
}
