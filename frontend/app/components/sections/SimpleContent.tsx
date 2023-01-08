import Markdown from "markdown-to-jsx";
import { useEffect, useState } from "react";

import type { SectionValues } from "./types";
import { clsx } from "clsx";

const contentSizeClassMap = {
  sm: "prose prose-sm md:prose-md lg:prose-lg",
  md: "prose md:prose-lg lg:prose-xl",
  lg: "prose prose-lg md:prose-xl lg:prose-2xl",
};

type Props = {
  sectionData: SectionValues<"sections.simple-content">;
};

const useImageSize = (src: string) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setSize({ width: img.width, height: img.height });
    };
  }, [src]);
  return size;
};

const MarkdownImage = ({
  src,
  alt,
  title,
}: {
  src: string;
  alt: string;
  title: string;
}) => {
  const { width, height } = useImageSize(src);

  return (
    <img
      src={width > 1000 ? `${src}?w=1000&h=1000&fit=crop` : src}
      alt={alt}
      title={title}
      className="w-full rounded-2xl"
      width={width}
      height={height}
    />
  );
};

const alignmentClasses = {
  start: "text-left",
  middle: "text-center",
  end: "text-right",
};

export function SimpleContent({ sectionData }: Props) {
  return (
    <section
      className={clsx(
        "bg-base-100 flex max-w-none flex-col py-12",
        sectionData.gutters && "px-10vw",
        alignmentClasses[sectionData.align],
        contentSizeClassMap[sectionData.contentSize || "md"]
      )}
    >
      <Markdown
        options={{
          overrides: {
            img: {
              component: MarkdownImage,
            },
          },
        }}
      >
        {sectionData.content}
      </Markdown>
    </section>
  );
}
