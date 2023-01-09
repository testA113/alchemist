import invariant from "tiny-invariant";

export function getEnv() {
  invariant(process.env.STRAPI_BASEURL, "STRAPI_BASEURL should be defined");
  invariant(process.env.GA_TRACKING_ID, "GA_TRACKING_ID should be defined");
  return {
    STRAPI_BASEURL: process.env.STRAPI_BASEURL,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  };
}

export type ENV = ReturnType<typeof getEnv>;

declare global {
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}
