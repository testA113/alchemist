import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export function VideoHero({ sectionData }: { sectionData: any }) {
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
      <motion.div
        style={{ y }}
        className="absolute inset-x-0 top-0 -z-20 h-full mx-auto w-full"
      >
        {/* <iframe src= frameborder="0"></iframe> */}
        <img
          className="object-cover h-full w-full"
          src="http://localhost:1337/uploads/otago_hospitality_awards_event_b28e2b6190.webp?updated_at=2022-09-26T10:11:02.868Z"
          alt="corporate event"
          height={1440}
          width={1344}
        />
      </motion.div>
      <h1>some text</h1>
      <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-base-100 to-transparent"></div>
    </section>
  );
}
