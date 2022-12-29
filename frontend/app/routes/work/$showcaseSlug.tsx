import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { type GetAttributesValues } from "@strapi/strapi";
import { type StrapiError } from "~/utils/utils.server";
import { getPage } from "../index.server";

type EventsResponse = {
  data: {
    id: number;
    attributes: GetAttributesValues<"api::showcase.showcase">;
  }[];
  error?: StrapiError<string>;
};

export async function loader({ params }: LoaderArgs) {
  // get the slug from the params
  const slug = params.showcaseSlug;
  if (!slug) {
    throw new Response("No event slug provided", { status: 400 });
  }

  // get the showcase data from strapi
  const eventResponse = await getPage(`showcases`, {
    queryParams: { "filters[slug][$eq]": slug },
  });
  const eventsData = (await eventResponse.json()) as EventsResponse;
  if (eventsData.error) {
    throw new Response("Error loading About Us data from strapi", {
      status: eventsData?.error?.status || 500,
    });
  }

  // return the data
  return json(
    {
      eventData: eventsData.data[0].attributes,
    },
    {
      headers: { "Cache-Control": "private, max-age=120" },
    }
  );
}

export default function Event() {
  const data = useLoaderData();
  const { eventData } = data;
  console.log(eventData);
  return <div className="min-h-minpage pt-32">hi</div>;
}
