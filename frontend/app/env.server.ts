import invariant from "tiny-invariant";

export function getEnv() {
  invariant(process.env.STRAPI_BASEURL, "STRAPI_BASEURL should be defined");
  return {
    STRAPI_BASEURL: process.env.STRAPI_BASEURL,
  };
}

export type ENV = ReturnType<typeof getEnv>;

declare global {
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}
