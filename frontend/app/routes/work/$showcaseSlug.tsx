import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { GetAttributesValues } from "@strapi/strapi";
import type { StrapiData, StrapiDataArray } from "~/types";
import { getPage } from "../index.server";
import { Section } from "../../components/sections/index";
import { Statistics } from "~/components/shared/Statistics";

export async function loader({ params }: LoaderArgs) {
  // get the slug from the params
  const slug = params.showcaseSlug;
  if (!slug) {
    throw new Response("No event slug provided", { status: 400 });
  }

  // get the showcase data from strapi
  const eventResponse = await getPage(`showcases`, {
    queryParams: { "filters[slug][$eq]": slug, populate: "deep" },
  });
  const eventsData = (await eventResponse.json()) as StrapiDataArray<
    GetAttributesValues<"api::showcase.showcase">
  >;
  if (eventsData.error) {
    throw new Response("Error loading About Us data from strapi", {
      status: eventsData?.error?.status || 500,
    });
  }

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
  const data = useLoaderData() as {
    eventData: GetAttributesValues<"api::showcase.showcase">;
  };
  const { eventData } = data;
  const event = eventData.event as
    | StrapiData<GetAttributesValues<"api::event.event">>
    | undefined;

  const attendees = event?.data.attributes.numberofattendees || "";
  const drinks = event?.data.attributes.drinksserved || "";
  const stats = [
    { value: attendees, label: "Attendees" },
    { value: drinks, label: "Cocktails Crafted" },
  ];
  return (
    <div className="min-h-minpage">
      <Section
        sectionData={{
          ...eventData.imageTitle,
          __component: "sections.image-title",
        }}
      />
      <div className="bg-base-100 px-10vw flex flex-col gap-x-8 md:flex-row-reverse">
        <div className="w-full py-12 md:w-1/3">
          <div className="h-min flex-none py-6 text-center md:sticky md:top-48 md:mb-0 md:w-full md:text-left">
            <Statistics statistics={stats} />
          </div>
        </div>
        <div className="w-full md:w-2/3">
          {eventData.sections.map((section, index) => (
            <Section key={index} sectionData={section} />
          ))}
        </div>
      </div>
      <div className="bg-base-100 w-full">bottom</div>
    </div>
  );
}
