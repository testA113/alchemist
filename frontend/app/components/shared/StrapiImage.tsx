import clsx from "clsx";
import type { ImageValues } from "./types";

type Props = {
  image: ImageValues;
  className?: string;
};

export function StrapiImage({ image: { attributes }, className }: Props) {
  const { url, formats, alternativeText, width, height } = attributes;
  return (
    <img
      src={`${ENV.STRAPI_BASEURL}${url}`}
      srcSet={clsx(
        formats?.small?.url &&
          `${ENV.STRAPI_BASEURL}${formats.small.url} 640w,`,
        formats?.medium?.url &&
          `${ENV.STRAPI_BASEURL}${formats.medium.url} 768w,`,
        formats?.large?.url &&
          `${ENV.STRAPI_BASEURL}${formats.large.url} 1024w,`
      )}
      alt={alternativeText}
      width={width}
      height={height}
      className={className}
    />
  );
}