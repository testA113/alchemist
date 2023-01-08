import { json, type MetaFunction } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import type { GetAttributesValues } from "@strapi/strapi";

import { getPage } from "./index.server";
import { PageError } from "~/components/shared/Alert/PageError";
import { Section } from "~/components/sections";
import { getStrapiSeo } from "~/utils/seo";

type PrivacyResponse = {
  privacyData: GetAttributesValues<"api::privacy.privacy">;
};

export async function loader() {
  const PrivacyResponse = await getPage("privacy", {
    queryParams: { populate: "deep" },
  });
  const privacyData = await PrivacyResponse.json();
  if (privacyData.error) {
    throw new Response("Error loading privacy page data from strapi", {
      status: privacyData?.error?.status || 500,
    });
  }

  return json(
    {
      privacyData: privacyData.data.attributes,
    },
    {
      headers: { "Cache-Control": "private, max-age=120" },
    }
  );
}

export const meta: MetaFunction = ({ data }) => {
  const {
    privacyData: { seo },
  } = data as PrivacyResponse;
  return getStrapiSeo(seo);
};

export default function Index() {
  const {
    privacyData: { sections },
  }: PrivacyResponse = useLoaderData();

  return (
    <div className="min-h-minpage pt-32">
      {sections.map((section, index) => (
        <Section key={index} sectionData={section} />
      ))}
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <PageError message="The privacy page couldn't be found. In the meantime, connect with us on our socials:" />
    );
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

export function ErrorBoundary() {
  return (
    <PageError message="There was an error loading the privacy page. Sorry! In the meantime, connect with us on our socials:" />
  );
}
