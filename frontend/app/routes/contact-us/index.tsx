import { type ActionArgs, redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { GetAttributesValues } from "@strapi/strapi";

import { ContactForm } from "../../components/sections/ContactForm";

import { getContactPage, postContactMessage } from "./contact-us.server";
import type { ContactMessage } from "./types";
import { Section } from "~/components/sections";

// get the contact page
export async function loader() {
  const contactResponse = await getContactPage();
  const contactData = await contactResponse.json();
  if (contactData.error) {
    throw new Response("Error loading contact page data from strapi", {
      status: contactData?.error?.status || 500,
    });
  }

  return json(
    {
      contactData: contactData.data.attributes,
    },
    {
      headers: { "Cache-Control": "private, max-age=120" },
    }
  );
}

// handle the contact us submission
export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const description = formData.get("description") as string;

  const bodyJson: ContactMessage = { data: { name, email, description } };
  // console.log(request);
  const response = await postContactMessage(bodyJson);
  console.log(response);
  return redirect("/contact-us");
};

export default function ContactUs() {
  const {
    contactData: { contactSections, seo },
  }: { contactData: GetAttributesValues<"api::contact.contact"> } =
    useLoaderData();

  console.log(contactSections[0]);

  return (
    <div className="min-h-page pt-32">
      {contactSections.map((section, index) => (
        <Section key={index} sectionData={section} />
      ))}
    </div>
  );
}
