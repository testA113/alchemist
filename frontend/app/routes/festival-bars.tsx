import { json } from "@remix-run/node";
import { getPage } from "./index.server";
import type { GetAttributesValues } from "@strapi/strapi";
import { useLoaderData } from "@remix-run/react";
import { Section } from "~/components/sections";

export async function loader() {
  const festivalBarsResponse = await getPage("festival-bars");
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

export default function FestivalBars() {
  const {
    festivalBarsData: { sections, seo },
  }: {
    festivalBarsData: GetAttributesValues<"api::brand-action.brand-action">;
  } = useLoaderData();

  return (
    <div className="min-h-minpage">
      {sections.map((section, index) => (
        <Section key={index} sectionData={section} />
      ))}
    </div>
  );
}
