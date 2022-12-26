import Markdown from "markdown-to-jsx";
import { useEffect, useState } from "react";

import type { SimpleContentValues } from "./types";

type Props = {
  sectionData: SimpleContentValues;
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
  const fullSrc = `${ENV.STRAPI_BASEURL}${src}`;
  return (
    <img
      src={width > 1000 ? `${fullSrc}?w=1000&h=1000&fit=crop` : fullSrc}
      alt={alt}
      title={title}
      className="w-full"
      width={width}
      height={height}
    />
  );
};

export function SimpleContent({ sectionData }: Props) {
  return (
    <section className="bg-base-100 px-10vw prose md:prose-lg lg:prose-xl flex max-w-max flex-col items-center justify-items-center py-12 text-center">
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
