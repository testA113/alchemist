import type {
  ComponentAttribute,
  DateTimeAttribute,
  GetAttributesValues,
  PrivateAttribute,
  RelationAttribute,
  RequiredAttribute,
  RichTextAttribute,
} from "@strapi/strapi";

import type { ImageData } from "../shared/types";

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
export type ServicesShowcaseValues =
  GetAttributesValues<"sections.services-showcase"> & DynamicZoneValueBase;
export type ShowcaseValues = GetAttributesValues<"sections.showcases"> &
  DynamicZoneValueBase;
export type EventPartnersValues =
  GetAttributesValues<"sections.event-partners"> & DynamicZoneValueBase;
export type ContactFormValues = GetAttributesValues<"sections.contact-form"> &
  DynamicZoneValueBase;
export type SimpleContentValues =
  GetAttributesValues<"sections.simple-content"> & DynamicZoneValueBase;
export type ImageTitleValues = GetAttributesValues<"sections.image-title"> &
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

export function isEventPartnersValues(
  sectionValues: DynamicSectionValues
): sectionValues is EventPartnersValues {
  return sectionValues.__component === "sections.event-partners";
}

export function isContactFormValues(
  sectionValues: DynamicSectionValues
): sectionValues is ContactFormValues {
  return sectionValues.__component === "sections.contact-form";
}

export function isSimpleContentValues(
  sectionValues: DynamicSectionValues
): sectionValues is SimpleContentValues {
  return sectionValues.__component === "sections.simple-content";
}

export function isImageTitleValues(
  sectionValues: DynamicSectionValues
): sectionValues is ImageTitleValues {
  return sectionValues.__component === "sections.image-title";
}

export interface Service {
  id: number;
  attributes: {
    name: string;
    slug: string;
    showcases: RelationAttribute<
      "api::service.service",
      "manyToMany",
      "api::showcase.showcase"
    >;
    events: RelationAttribute<
      "api::service.service",
      "manyToMany",
      "api::event.event"
    >;
    seo: ComponentAttribute<"shared.seo">;
    image: ImageData;
    fullDescription: RichTextAttribute;
    shortDescription: string;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
  };
}

type ServicesData = {
  data: Service[];
};

interface ImageTitleAttributes {
  title: string;
  image: ImageData;
}

interface ShowcaseAttributes {
  imageTitle: ImageTitleAttributes;
  title: string;
  summary: string;
  hero: ImageData;
  content: RichTextAttribute & RequiredAttribute;
  slug: string;
  client: string;
  name: string;
  services: ServicesData;
  event: RelationAttribute<
    "api::showcase.showcase",
    "oneToOne",
    "api::event.event"
  >;
  seo: ComponentAttribute<"shared.seo">;
  featured: boolean;
  createdAt: DateTimeAttribute;
  updatedAt: DateTimeAttribute;
  publishedAt: DateTimeAttribute;
  createdBy: RelationAttribute<
    "api::showcase.showcase",
    "oneToOne",
    "admin::user"
  > &
    PrivateAttribute;
  updatedBy: RelationAttribute<
    "api::showcase.showcase",
    "oneToOne",
    "admin::user"
  > &
    PrivateAttribute;
}

export interface Showcase {
  id: number;
  attributes: ShowcaseAttributes;
}
