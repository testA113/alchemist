import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { type GetAttributesValues } from "@strapi/strapi";
import { type StrapiError } from "~/utils/utils.server";
import { getPage } from "../index.server";

export async function loader({ params }: LoaderArgs) {
  const id = params.eventId;
  const eventResponse = await getPage(`showcases/${id}`);
  const eventData = (await eventResponse.json()) as {
    attributes: GetAttributesValues<"api::showcase.showcase">;
    error: StrapiError<string>;
  };
  if (eventData.error) {
    throw new Response("Error loading About Us data from strapi", {
      status: eventData?.error?.status || 500,
    });
  }
  return json(
    {
      eventData,
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
