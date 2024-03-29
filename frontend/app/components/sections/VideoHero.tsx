import clsx from "clsx";
import {
  useScroll,
  useTransform,
  LazyMotion,
  domAnimation,
  m,
} from "framer-motion";
import { VisuallyHidden } from "reakit/VisuallyHidden";
import { useEffect, useRef, useState } from "react";

import { Button } from "~/components/shared/Actions/Button";
import { LinkButton } from "../shared/Actions/LinkButton";
import { StrapiImage } from "../shared/StrapiImage";

import type { SectionValues } from "./types";

type Props = {
  sectionData: SectionValues<"sections.video-hero">;
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
            <StrapiImage
              image={sectionData.loadingBackgroundImage.data}
              className="hidden h-full w-full object-cover md:block"
            />
          )}
          {/* for small screens */}
          <StrapiImage
            image={sectionData.fallbackImage.data}
            className="block h-full w-full object-cover md:hidden lg:hidden"
          />
        </m.div>
        {/* div to hide the image when the div shifts up on mobile */}
        <div className="bg-base-100 absolute top-full mx-auto h-24 w-full" />
      </LazyMotion>
      <div className="px-10vw z-20 flex flex-col items-start gap-6">
        <div className="prose-xl md:prose-2xl lg:prose-3xl relative flex w-full flex-col flex-wrap pr-24 md:w-[60%] lg:w-[50%]">
          <h2 className="font-suez !mb-4 text-white">
            {sectionData.cyclingSentence.sentencestart}
          </h2>
          <h2 className="font-suez !mb-24 italic md:!mb-32">
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
        <div className="xs:justify-start flex w-full justify-between gap-6">
          {primaryButton && (
            <LinkButton {...primaryButton}>{primaryButton.text}</LinkButton>
          )}
          {link && (
            <>
              <Button
                {...link}
                id={"expanded-learn-more-button"}
                className="xs:flex hidden"
                onClick={() => scrollDown()}
              >
                {link.text}
              </Button>
              <Button
                {...link}
                id={"minimised-learn-more-button"}
                className="xs:hidden btn-circle btn-primary animate-bobbing flex"
                onClick={() => scrollDown()}
              >
                <VisuallyHidden>{link.text}</VisuallyHidden>
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="from-base-100 absolute bottom-0 h-2/3 w-full bg-gradient-to-t to-transparent"></div>
      <div className="absolute bottom-0" ref={bottomRef} />
    </section>
  );
}
