import type { GetAttributesValues } from "@strapi/strapi";

export const getStrapiSeo = (seo: GetAttributesValues<"shared.seo">) => {
  const { title, description, keywords } = seo;
  const { url, provider } = seo.image.data.attributes;
  const baseUrl = provider === "local" ? ENV?.STRAPI_BASEURL : "";
  const image = `${baseUrl}${url}`;
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
