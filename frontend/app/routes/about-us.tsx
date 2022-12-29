import { json, type MetaFunction } from "@remix-run/node";
import { getPage } from "./index.server";
import type { GetAttributesValues } from "@strapi/strapi";
import { useLoaderData } from "@remix-run/react";
import { Section } from "~/components/sections";
import { getStrapiSeo } from "~/utils/seo";

export async function loader() {
  const aboutUsResponse = await getPage("about-us", {
    queryParams: { populate: "deep" },
  });
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

export const meta: MetaFunction = ({ data }) => {
  const {
    aboutUsData: { seo },
  } = data as {
    aboutUsData: GetAttributesValues<"api::about-us.about-us">;
  };
  return getStrapiSeo(seo);
};

export default function AboutUs() {
  const {
    aboutUsData: { sections },
  }: {
    aboutUsData: GetAttributesValues<"api::about-us.about-us">;
  } = useLoaderData();

  return (
    <div className="min-h-minpage pt-32">
      {sections.map((section, index) => (
        <Section key={index} sectionData={section} />
      ))}
    </div>
  );
}
