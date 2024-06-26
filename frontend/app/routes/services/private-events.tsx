import { json, type SerializeFrom, type MetaFunction } from "@remix-run/node";
import { getPage } from "../index.server";
import type { GetAttributesValues } from "@strapi/strapi";
import { useLoaderData } from "@remix-run/react";
import { type StructuredDataFunction } from "remix-utils";

import { Section } from "~/components/sections";
import { getStrapiSeo } from "~/utils/seo";

export async function loader() {
  const privateEventsResponse = await getPage("private-events", {
    queryParams: { populate: "deep" },
  });
  const privateEventsData = await privateEventsResponse.json();
  if (privateEventsData.error) {
    throw new Response("Error loading Private Events data from strapi", {
      status: privateEventsData?.error?.status || 500,
    });
  }

  return json(
    {
      privateEventsData: privateEventsData.data.attributes,
    },
    {
      headers: { "Cache-Control": "private, max-age=120" },
    }
  );
}

export const meta: MetaFunction = ({ data }) => {
  const {
    privateEventsData: { seo },
  } = data as {
    privateEventsData: GetAttributesValues<"api::private-events.private-events">;
  };
  return getStrapiSeo(seo);
};

let structuredData: StructuredDataFunction<
  SerializeFrom<typeof loader>,
  any
> = ({ data }) => {
  const {
    privateEventsData: { seo },
  } = data as {
    privateEventsData: GetAttributesValues<"api::private-events.private-events">;
  };

  return seo.structuredData;
};
export let handle = { structuredData };

export default function PrivateEvents() {
  const {
    privateEventsData: { sections },
  }: {
    privateEventsData: GetAttributesValues<"api::brand-action.brand-action">;
  } = useLoaderData();

  return (
    <div className="min-h-minpage pt-32">
      {sections.map((section, index) => (
        <Section key={index} sectionData={section} />
      ))}
    </div>
  );
}
