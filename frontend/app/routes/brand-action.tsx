import { json, type MetaFunction } from "@remix-run/node";
import { getPage } from "./index.server";
import type { GetAttributesValues } from "@strapi/strapi";
import { useLoaderData } from "@remix-run/react";

import { Section } from "~/components/sections";
import { getStrapiSeo } from "~/utils/seo";
export async function loader() {
  const brandActionResponse = await getPage("brand-action");
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

export default function BrandAction() {
  const {
    brandActionData: { sections },
  }: {
    brandActionData: GetAttributesValues<"api::brand-action.brand-action">;
  } = useLoaderData();

  return (
    <div className="min-h-minpage">
      {sections.map((section, index) => (
        <Section key={index} sectionData={section} />
      ))}
    </div>
  );
}
