import { json } from "@remix-run/node";
import { getPage } from "./index.server";
import type { GetAttributesValues } from "@strapi/strapi";
import { useLoaderData } from "@remix-run/react";
import { Section } from "~/components/sections";

export async function loader() {
  const aboutUsResponse = await getPage("about-us");
  const aboutUsData = await aboutUsResponse.json();
  if (aboutUsData.error) {
    throw new Response("Error loading About Us data from strapi", {
      status: aboutUsData?.error?.status || 500,
    });
  }

  return json(
    {
      aboutUsData: aboutUsData.data.attributes,
    },
    {
      headers: { "Cache-Control": "private, max-age=120" },
    }
  );
}

export default function AboutUs() {
  const {
    aboutUsData: { sections, seo },
  }: {
    aboutUsData: GetAttributesValues<"api::about-us.about-us">;
  } = useLoaderData();

  return (
    <div className="min-h-minpage">
      {sections.map((section, index) => (
        <Section key={index} sectionData={section} />
      ))}
    </div>
  );
}
