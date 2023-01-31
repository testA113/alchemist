import { json, type SerializeFrom, type MetaFunction } from "@remix-run/node";
import { getPage } from "../index.server";
import type { GetAttributesValues } from "@strapi/strapi";
import { useLoaderData } from "@remix-run/react";

import { Section } from "~/components/sections";
import { getStrapiSeo } from "~/utils/seo";
import { type StructuredDataFunction } from "remix-utils";
export async function loader() {
  const festivalBarsResponse = await getPage("festival-bars", {
    queryParams: { populate: "deep" },
  });
  const festivalBarsData = await festivalBarsResponse.json();
  if (festivalBarsData.error) {
    throw new Response("Error loading Festival Bars data from strapi", {
      status: festivalBarsData?.error?.status || 500,
    });
  }

  return json(
    {
      festivalBarsData: festivalBarsData.data.attributes,
    },
    {
      headers: { "Cache-Control": "private, max-age=120" },
    }
  );
}

export const meta: MetaFunction = ({ data }) => {
  const {
    festivalBarsData: { seo },
  } = data as {
    festivalBarsData: GetAttributesValues<"api::festival-bars.festival-bars">;
  };
  return getStrapiSeo(seo);
};

let structuredData: StructuredDataFunction<
  SerializeFrom<typeof loader>,
  any
> = ({ data }) => {
  const {
    festivalBarsData: { seo },
  } = data as {
    festivalBarsData: GetAttributesValues<"api::festival-bars.festival-bars">;
  };

  return seo.structuredData;
};
export let handle = { structuredData };

export default function FestivalBars() {
  const {
    festivalBarsData: { sections },
  }: {
    festivalBarsData: GetAttributesValues<"api::brand-action.brand-action">;
  } = useLoaderData();

  return (
    <div className="min-h-minpage pt-32">
      {sections.map((section, index) => (
        <Section key={index} sectionData={section} />
      ))}
    </div>
  );
}
