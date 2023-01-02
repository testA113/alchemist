import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { GetAttributesValues } from "@strapi/strapi";
import type { StrapiData, StrapiDataArray } from "~/types";
import { getPage } from "../index.server";
import { Section } from "../../components/sections/index";
import { Statistics } from "~/components/shared/Statistics";
import { Profile } from "~/components/shared/Profile";
import { LinkButton } from "~/components/shared/Actions/LinkButton";

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

  const attendees = event?.data?.attributes.numberofattendees || "";
  const drinks = event?.data?.attributes.drinksserved || "";
  const stats = (attendees || attendees) && [
    { value: attendees, label: "Attendees" },
    { value: drinks, label: "Cocktails Crafted" },
  ];
  const client = eventData.client as
    | StrapiData<GetAttributesValues<"api::client.client">>
    | undefined;
  const eventUrl = event?.data?.attributes?.url || "";
  const services = eventData.services as
    | StrapiDataArray<GetAttributesValues<"api::service.service">>
    | undefined;

  console.log(eventData.leftSections);
  return (
    <div className="min-h-minpage">
      <Section
        sectionData={{
          ...eventData.imageTitle,
          __component: "sections.image-title",
        }}
      />
      <div className="px-10vw bg-base-100 flex w-full justify-start">
        <LinkButton
          mode="link"
          icon="ChevronRight"
          className="text-base-content btn-outline w-max"
          to={eventUrl}
          external
          newTab
        >
          Event Page
        </LinkButton>
      </div>
      <div className="bg-base-100 px-10vw mb-24 flex flex-col gap-x-16 md:flex-row">
        <div className="w-full md:w-2/3">
          <div className="mt-16 md:hidden">
            {stats && <Statistics statistics={stats} />}
          </div>
          {eventData.leftSections.map((section, index) => (
            <Section key={index} sectionData={section} />
          ))}
        </div>
        <div className="w-full pb-12 sm:pt-0 md:w-1/3 md:pt-12 lg:pt-12">
          <div className="flex h-min flex-col gap-y-6 pt-6 md:sticky md:top-24 md:mb-0 md:w-full md:text-start">
            <div className="hidden sm:hidden md:block">
              {stats && <Statistics statistics={stats} />}
            </div>
            {client?.data && (
              <div className="prose md:prose-lg lg:prose-xl">
                <h3>Tailored for:</h3>
                <Profile client={client} />
              </div>
            )}
            {services?.data.length && (
              <div className="prose md:prose-lg lg:prose-xl">
                <h3>With expertise in:</h3>
                <div className="flex flex-col gap-y-2">
                  {services.data.map((service, index) => (
                    <LinkButton
                      key={index}
                      to={`../${service.attributes.slug}`}
                      mode="default"
                      className="btn-outline btn-xs"
                    >
                      {service.attributes.name}
                    </LinkButton>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-base-100 w-full pb-12">
        {eventData.bottomSections?.map((section, index) => (
          <Section key={index} sectionData={section} />
        ))}
      </div>
    </div>
  );
}
