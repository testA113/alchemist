import type { ComponentAttribute, DateTimeAttribute, GetAttributesValues, RelationAttribute, RichTextAttribute } from "@strapi/strapi";

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
export type ServicesShowcaseValues = GetAttributesValues<"sections.services-showcase"> & DynamicZoneValueBase
export type ShowcaseValues = GetAttributesValues<"sections.showcases"> &
  DynamicZoneValueBase;

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

export function isServicesShowcaseValues(
  sectionValues: DynamicSectionValues
): sectionValues is ServicesShowcaseValues {
  return sectionValues.__component === "sections.services-showcase";
}

export function isShowcaseValues(
  sectionValues: DynamicSectionValues
): sectionValues is ShowcaseValues {
  return sectionValues.__component === "sections.showcases";
}