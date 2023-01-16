import type {
  ComponentAttribute,
  DateTimeAttribute,
  GetAttributesValues,
  PrivateAttribute,
  RelationAttribute,
  RequiredAttribute,
  RichTextAttribute,
} from "@strapi/strapi";
import { type StrapiData } from "~/types";

import type { ImageData } from "../shared/types";

type DynamicZoneValueBase = {
  __component: keyof Strapi.Schemas;
};

export type DynamicSectionValues = GetAttributesValues<keyof Strapi.Schemas> &
  DynamicZoneValueBase;

export type SectionValues<T extends keyof Strapi.Schemas> =
  GetAttributesValues<T> & DynamicZoneValueBase;

export function isSectionValues<T extends keyof Strapi.Schemas>(
  sectionValues: DynamicSectionValues,
  sectionType: T
): sectionValues is SectionValues<T> {
  return sectionValues.__component === sectionType;
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

export interface Testimonial {
  id: number;
  attributes: {
    testimonial: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    name: string;
    client: StrapiData<"api::client.client">;
  };
}

export interface Testimonials {
  data: Testimonial[];
}
