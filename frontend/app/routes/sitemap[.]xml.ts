import type { StrapiDataArray } from "~/types";
import { getPage } from "./index.server";

type SitemapEntry = {
  loc: string;
  lastmod: string;
  priority: number;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
};

const getHardcodedSitemapEntries = (isoDateString: string): SitemapEntry[] => [
  {
    loc: "/",
    lastmod: isoDateString,
    priority: 1,
    changefreq: "daily",
  },
  {
    loc: "/about-us",
    lastmod: isoDateString,
    priority: 0.8,
    changefreq: "monthly",
  },
  {
    loc: "/contact-us",
    lastmod: isoDateString,
    priority: 0.9,
    changefreq: "monthly",
  },
  {
    loc: "/privacy-policy",
    lastmod: isoDateString,
    priority: 0.4,
    changefreq: "monthly",
  },
];

export async function loader() {
  const today = new Date().toISOString();
  // start by getting the hardcoded entries
  const hardCodedSitemapEntries = getHardcodedSitemapEntries(today);

  // next, dynamically add entries for the /services/* pages based on the data from strapi
  const servicesResponse = await getPage("services");
  const servicesData =
    (await servicesResponse.json()) as StrapiDataArray<"api::service.service">;
  if (servicesData.error) {
    throw new Response("Error loading services page data from strapi", {
      status: servicesData?.error?.status || 500,
    });
  }
  const servicesSitemapEntries = servicesData.data.map((service) => ({
    loc: `/services/${service.attributes.slug}`,
    lastmod: service.attributes.updatedAt,
    priority: 0.8,
    changefreq: "monthly",
  }));

  // finally, dynamically add entries for the /work/* pages based on the data from strapi
  const workResponse = await getPage("showcases");
  const workData =
    (await workResponse.json()) as StrapiDataArray<"api::showcase.showcase">;
  if (workData.error) {
    throw new Response("Error loading showcases page data from strapi", {
      status: workData?.error?.status || 500,
    });
  }
  const showcaseSitemapEntries = workData.data.map((showcase) => ({
    loc: `/work/${showcase.attributes.slug}`,
    lastmod: showcase.attributes.updatedAt,
    priority: 0.8,
    changefreq: "monthly",
  }));

  // extract the above dynamic page xml code as a function if I create more content types (repeating twice is ok, three times is too much)

  // combine all the entries into one array
  const allSiteMapEntries = [
    ...hardCodedSitemapEntries,
    ...servicesSitemapEntries,
    ...showcaseSitemapEntries,
  ];

  // create the xml string
  const combinedEntries = allSiteMapEntries
    .map(
      (entry) => `
        <url>
            <loc>${process.env.SERVER_BASEURL}${entry.loc}</loc>
            <lastmod>${entry.lastmod}</lastmod>
            <priority>${entry.priority}</priority>
            <changefreq>${entry.changefreq}</changefreq>
        </url>
    `
    )
    .join("");
  const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${combinedEntries}</urlset>`;

  return new Response(xmlString, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "x-content-type-options": "nosniff",
      "Cache-Control": `public, max-age=600, s-maxage=${60 * 60 * 24}`,
    },
  });
}
