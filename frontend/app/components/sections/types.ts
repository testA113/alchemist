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
