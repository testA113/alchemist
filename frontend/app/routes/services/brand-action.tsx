import { json, type SerializeFrom, type MetaFunction } from "@remix-run/node";
import { getPage } from "../index.server";
import type { GetAttributesValues } from "@strapi/strapi";
import { useLoaderData } from "@remix-run/react";
import { type StructuredDataFunction } from "remix-utils";

import { Section } from "~/components/sections";
import { getStrapiSeo } from "~/utils/seo";
export async function loader() {
  const brandActionResponse = await getPage("brand-action", {
    queryParams: { populate: "deep" },
  });
  const brandActionData = await brandActionResponse.json();
  if (brandActionData.error) {
    throw new Response("Error loading Brand Action data from strapi", {
      status: brandActionData?.error?.status || 500,
    });
  }

  return json(
    {
      brandActionData: brandActionData.data.attributes,
    },
    {
      headers: { "Cache-Control": "private, max-age=120" },
    }
  );
}

export const meta: MetaFunction = ({ data }) => {
  const {
    brandActionData: { seo },
  } = data as {
    brandActionData: GetAttributesValues<"api::brand-action.brand-action">;
  };
  return getStrapiSeo(seo);
};

let structuredData: StructuredDataFunction<
  SerializeFrom<typeof loader>,
  any
> = ({ data }) => {
  const {
    brandActionData: { seo },
  } = data as {
    brandActionData: GetAttributesValues<"api::brand-action.brand-action">;
  };

  return seo.structuredData;
};
export let handle = { structuredData };

export default function BrandAction() {
  const {
    brandActionData: { sections },
  }: {
    brandActionData: GetAttributesValues<"api::brand-action.brand-action">;
  } = useLoaderData();

  return (
    <div className="min-h-minpage pt-32">
      {sections.map((section, index) => (
        <Section key={index} sectionData={section} />
      ))}
    </div>
  );
}
