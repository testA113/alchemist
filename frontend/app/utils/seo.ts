import type { GetAttributesValues } from "@strapi/strapi";

export const getStrapiSeo = (seo: GetAttributesValues<"shared.seo">) => {
  const { title, description, keywords } = seo;
  const image = `${ENV.STRAPI_BASEURL}${seo.image.data.attributes?.url}`;
  return {
    title,
    description,
    keywords,
    image,
    "og:title": title,
    "og:description": description,
    "og:image": image,
    "twitter:card": image,
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": image,
    "twitter:alt": title,
  };
};
