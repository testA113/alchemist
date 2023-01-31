import { json, type SerializeFrom, type MetaFunction } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import type { GetAttributesValues } from "@strapi/strapi";
import { type StructuredDataFunction } from "remix-utils";

import { getPage } from "./index.server";
import { PageError } from "~/components/shared/Alert/PageError";
import { Section } from "~/components/sections";
import { getStrapiSeo } from "~/utils/seo";

type HomeResponse = {
  homeData: GetAttributesValues<"api::home.home">;
};

export async function loader() {
  const homeResponse = await getPage("home", {
    queryParams: { populate: "deep" },
  });
  const homeData = await homeResponse.json();
  if (homeData.error) {
    throw new Response("Error loading home page data from strapi", {
      status: homeData?.error?.status || 500,
    });
  }

  return json(
    {
      homeData: homeData.data.attributes,
    },
    {
      headers: { "Cache-Control": "private, max-age=120" },
    }
  );
}

export const meta: MetaFunction = ({ data }) => {
  const {
    homeData: { seo },
  } = data as HomeResponse;
  return getStrapiSeo(seo);
};

let structuredData: StructuredDataFunction<
  SerializeFrom<typeof loader>,
  any
> = ({ data }) => {
  const {
    homeData: { seo },
  } = data as HomeResponse;

  return seo.structuredData;
};
export let handle = { structuredData };

export default function Index() {
  const {
    homeData: { homesections },
  }: HomeResponse = useLoaderData();
  return (
    <div className="min-h-minpage">
      {homesections.map((section, index) => (
        <Section key={index} sectionData={section} />
      ))}
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <PageError message="The home page couldn't be found. In the meantime, connect with us on our socials:" />
    );
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <PageError message="There was an error loading the home page. Sorry! In the meantime, connect with us on our socials:" />
  );
}
