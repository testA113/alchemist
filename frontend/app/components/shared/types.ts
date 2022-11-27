import {
  BooleanAttribute,
  ComponentAttribute,
  DateTimeAttribute,
  MediaAttribute,
  PrivateAttribute,
  RelationAttribute,
  RequiredAttribute,
  RichTextAttribute,
  SetMinMaxLength,
  StringAttribute,
  TextAttribute,
  UIDAttribute,
} from "@strapi/strapi";

type ImageSize = "small" | "medium" | "large" | "thumbnail";

type SizeValues = {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  url: string;
  width: number;
};

type ImageFormats = Record<ImageSize, SizeValues>;

export type ImageAttributes = {
  alternativeText: string;
  caption: string;
  createdAt: string;
  ext: string;
  formats: ImageFormats;
  hash: string;
  height: number;
  mime: string;
  name: string;
  previewUrl: string;
  provider: string;
  provider_metadata: string | null;
  size: number;
  updatedAt: string;
  url: string;
  width: string;
};

export type ImageValues = {
  id: number;
  attributes: ImageAttributes;
};

export type ImageData = {
  data: ImageValues;
};

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

interface ShowcaseAttributes {
  title: string;
  summary: string;
  hero: MediaAttribute & RequiredAttribute;
  content: RichTextAttribute & RequiredAttribute;
  slug: string;
  client: string;
  name: string;
  services: RelationAttribute<
    "api::showcase.showcase",
    "manyToMany",
    "api::service.service"
  >;
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
