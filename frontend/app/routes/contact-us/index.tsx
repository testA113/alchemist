import {
  type ActionArgs,
  json,
  redirect,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { GetAttributesValues } from "@strapi/strapi";
import { validationError } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

import {
  createAssessment,
  getContactPage,
  postContactMessage,
  sendConfirmationEmail,
} from "./contact-us.server";
import type { ContactMessage, ContactMessagePayload } from "./types";
import { Section } from "~/components/sections";
import { formatStrapiError } from "~/utils/utils.server";
import { getStrapiSeo } from "~/utils/seo";
import {
  generateConfirmationEmail,
  generateNewEnquiryEmail,
} from "./email-templates.server";

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
        message: "Describe your exciting event! Minimum 10 characters.",
      })
      .max(4000, {
        message: "Maximum 4000 characters. We can talk more soon.",
      }),
  })
);

// handle the contact us submission
export const action = async ({ request }: ActionArgs) => {
  // run the same client validation server side and return the errors if any exist
  const dataResult = await validator.validate(await request.formData());
  if (dataResult.error) return validationError(dataResult.error);

  // check the google captchav3 token score and return an error if it is too low
  const tokenScore = await createAssessment(dataResult.submittedData.token);
  if (!tokenScore || tokenScore < 0.9) {
    return redirect("/contact-us/robot");
  }

  // post the message to strapi and return the errors if any exist in the same format
  const messageBody: ContactMessagePayload = {
    data: dataResult.data,
  };
  const { error } = await postContactMessage(messageBody);
  if (error) {
    const formattedError = formatStrapiError<keyof ContactMessage>(error);
    return validationError({ fieldErrors: formattedError });
  }

  // Send a confirmation email to the user using sendgrid
  const { name, email, description } = dataResult.data;
  const confirmationEmailError = sendConfirmationEmail(
    email,
    "Contact Us Confirmation",
    generateConfirmationEmail(name)
  );
  if (confirmationEmailError) {
    // only show an error server side because the user is notified of the confirmation on the success page too
    console.error(confirmationEmailError);
  }

  // Send a notification email to Alchemist Mixology using sendgrid
  const clientError =
    "Error sending message to Alchemist Mixology, please try again, or contact us directly at jaz@alchemistmixology.co.nz";
  const fromEmail = process.env.FROM_EMAIL;
  if (!fromEmail) {
    console.error(
      "FROM_EMAIL environment variable is not set, please contact the site administrator"
    );
    throw new Response(clientError, { status: 500 });
  }
  const notificationEmailError = await sendConfirmationEmail(
    fromEmail,
    "New Event Enquiry",
    generateNewEnquiryEmail(name, email, description)
  );
  if (notificationEmailError) {
    console.error(notificationEmailError);
    throw new Response(clientError, { status: 500 });
  }

  // redirect to the success page
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

export const meta: MetaFunction = ({ data }) => {
  const {
    contactData: { seo },
  } = data as {
    contactData: GetAttributesValues<"api::contact.contact">;
  };
  return getStrapiSeo(seo);
};

export default function ContactUs() {
  const {
    contactData: { contactSections },
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
