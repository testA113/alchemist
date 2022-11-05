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
