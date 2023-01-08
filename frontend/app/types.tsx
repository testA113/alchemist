import { type GetAttributesValues } from "@strapi/strapi";

export type StrapiError<ErrorKeys> = {
  status: number;
  name: string;
  message: string;
  details: {
    errors: {
      path: Array<ErrorKeys>;
      message: string;
      name: string;
    }[];
  };
};

export type StrapiData<T extends keyof Strapi.Schemas> = {
  data: {
    id: number;
    attributes: GetAttributesValues<T>;
  };
  error?: StrapiError<string>;
};

export type StrapiDataArray<T extends keyof Strapi.Schemas> = {
  data: {
    id: number;
    attributes: GetAttributesValues<T>;
  }[];
  error?: StrapiError<string>;
};
