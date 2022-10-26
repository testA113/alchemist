import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import type { GetAttributesValues } from "@strapi/strapi";

import { getHomePage } from "./home.server";
import { PageError } from "~/components/shared/Alert/PageError";
import { Section } from "~/components/sections";

export async function loader() {
  const homeResponse = await getHomePage();
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

export default function Index() {
  const {
    homeData: { homesections, seo },
  }: {
    homeData: GetAttributesValues<"api::home.home">;
  } = useLoaderData();

  return (
    <div className="min-h-minpage">
      {homesections.map((section) => (
        <Section
          key={section.__component}
          componentType={section.__component}
          sectionData={section}
        />
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
  console.error(error);
  return (
    <PageError message="There was an error loading the home page. Sorry! In the meantime, connect with us on our socials:" />
  );
}
