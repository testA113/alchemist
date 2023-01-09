import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { GetAttributesValues } from "@strapi/strapi";

import { Section } from "~/components/sections";
import { getStrapiSeo } from "~/utils/seo";
import { getPage } from "../index.server";

type ContactSuccessResponse = {
  data: GetAttributesValues<"api::contact-success.contact-success">;
};

export async function loader() {
  const contactSuccessResponse = await getPage("contact-success", {
    queryParams: { populate: "deep" },
  });
  const data = await contactSuccessResponse.json();
  if (data.error) {
    throw new Response("Error loading home page data from strapi", {
      status: data?.error?.status || 500,
    });
  }

  return json(
    {
      data: data.data.attributes,
    },
    {
      headers: { "Cache-Control": "private, max-age=120" },
    }
  );
}

export const meta: MetaFunction = ({ data }) => {
  const {
    data: { seo },
  } = data as ContactSuccessResponse;
  return getStrapiSeo(seo);
};

export default function ContactUsSuccess() {
  const {
    data: { sections },
  }: ContactSuccessResponse = useLoaderData();
  return (
    <div className="min-h-minpage pt-32">
      {sections.map((section, index) => (
        <Section key={index} sectionData={section} />
      ))}
    </div>
  );
}
