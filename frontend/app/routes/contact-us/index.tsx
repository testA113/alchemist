import { type ActionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { GetAttributesValues } from "@strapi/strapi";
import { validationError } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

import { getContactPage, postContactMessage } from "./contact-us.server";
import type { ContactMessage, ContactMessagePayload } from "./types";
import { Section } from "~/components/sections";
import { formatStrapiError } from "../utils.server";

export const validator = withZod(
  z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),
    description: z
      .string()
      .min(10, {
        message: "Your event is worth more than that! Minimum 10 characters.",
      })
      .max(4000, {
        message: "Maximum 4000 characters. We can talk more about it soon.",
      }),
  })
);

// handle the contact us submission
export const action = async ({ request }: ActionArgs) => {
  console.log(request);
  const dataResult = await validator.validate(await request.formData());

  // run the same client validation server side and return the errors
  if (dataResult.error) return validationError(dataResult.error);
  const messageBody: ContactMessagePayload = {
    data: dataResult.data,
  };

  // post the message to strapi
  const { error } = await postContactMessage(messageBody);
  if (error) {
    const formattedError = formatStrapiError<keyof ContactMessage>(error);
    // using validationError here will show the errors in the form
    return validationError({ fieldErrors: formattedError });
  }

  return redirect("/contact-us/success");
};

// get the contact page
export async function loader() {
  try {
    const contactResponse = await getContactPage();

    const contactData = await contactResponse.json();
    if (contactData.error) {
      throw new Response(
        "Upstream error loading contact page data from strapi",
        {
          status: contactData?.error?.status || 500,
          statusText: contactData?.error?.message,
        }
      );
    }

    return json(
      {
        contactData: contactData.data.attributes,
      },
      {
        headers: { "Cache-Control": "private, max-age=120" },
      }
    );
  } catch (error) {
    throw new Response("Error loading contact page data from strapi", {
      status: 500,
    });
  }
}

export default function ContactUs() {
  const {
    contactData: { contactSections, seo },
  }: { contactData: GetAttributesValues<"api::contact.contact"> } =
    useLoaderData();

  return (
    <div className="min-h-minpage pt-32">
      {contactSections.map((section, index) => (
        <Section key={index} sectionData={section} />
      ))}
    </div>
  );
}
