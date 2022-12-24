import { json } from "@remix-run/node";
import { getPage } from "./index.server";
import type { GetAttributesValues } from "@strapi/strapi";
import { useLoaderData } from "@remix-run/react";
import { Section } from "~/components/sections";

export async function loader() {
  const privateEventsResponse = await getPage("private-events");
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

export default function PrivateEvents() {
  const {
    privateEventsData: { sections, seo },
  }: {
    privateEventsData: GetAttributesValues<"api::brand-action.brand-action">;
  } = useLoaderData();

  return (
    <div className="min-h-minpage">
      {sections.map((section, index) => (
        <Section key={index} sectionData={section} />
      ))}
    </div>
  );
}
