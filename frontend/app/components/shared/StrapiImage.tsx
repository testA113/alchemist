import clsx from "clsx";
import type { ImageValues } from "./types";

type Props = {
  image: ImageValues;
  title?: string;
  className?: string;
};

export function StrapiImage({
  image: { attributes },
  className,
  title,
}: Props) {
  const { url, formats, alternativeText, width, height, provider } = attributes;
  const imageBaseUrl = provider === "local" ? ENV.STRAPI_BASEURL : "";
  return (
    <img
      src={`${imageBaseUrl}${url}`}
      srcSet={clsx(
        formats?.small?.url && `${imageBaseUrl}${formats.small.url} 640w,`,
        formats?.medium?.url &&
          `${imageBaseUrl}${formats.medium.url || formats.small.url} 768w,`,
        formats?.large?.url &&
          `${imageBaseUrl}${
            formats.large.url || formats.medium.url || formats.small.url
          } 1024w,`
      )}
      title={title}
      alt={alternativeText}
      width={width}
      height={height}
      className={className}
    />
  );
}
