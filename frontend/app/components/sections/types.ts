import type { GetAttributesValues } from "@strapi/strapi";

type DynamicZoneValueBase = {
  __component: keyof Strapi.Schemas;
};

export type DynamicSectionValues = GetAttributesValues<keyof Strapi.Schemas> &
  DynamicZoneValueBase;
export type VideoHeroValues = GetAttributesValues<"sections.video-hero"> &
  DynamicZoneValueBase;
export type LargeSummaryValues = GetAttributesValues<"sections.large-summary"> &
  DynamicZoneValueBase;
export type CarouselValues =
  GetAttributesValues<"sections.full-size-carousel"> & DynamicZoneValueBase;

export function isVideoHeroValues(
  sectionValues: DynamicSectionValues
): sectionValues is VideoHeroValues {
  return sectionValues.__component === "sections.video-hero";
}

export function isLargeSummaryValues(
  sectionValues: DynamicSectionValues
): sectionValues is LargeSummaryValues {
  return sectionValues.__component === "sections.large-summary";
}

export function isCarouselValues(
  sectionValues: DynamicSectionValues
): sectionValues is CarouselValues {
  return sectionValues.__component === "sections.full-size-carousel";
}
