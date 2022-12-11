import { type ActionArgs, redirect, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import { getContactPage, postContactMessage } from "./contact-us.server";
import type { ContactMessage } from "./types";

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
    contactData: { contactForm, seo },
  } = useLoaderData();

  console.log(contactForm);

  return (
    <div className="min-h-page pt-32">
      <section
        className={clsx(
          "bg-base-100 flex flex-col",
          "px-10vw w-full !max-w-full items-center py-12"
        )}
      >
        <div className="prose md:prose-lg lg:prose-xl mb-12">
          <h1>Contact Us</h1>
        </div>
        <Form method="post">
          <div className="flex flex-col gap-y-4">
            <p>
              <label className="flex flex-col">
                Hi, my name is:
                <input
                  name="name"
                  type="text"
                  max={100}
                  placeholder="Slim Shady"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </p>
            <p>
              <label className="flex flex-col">
                You can reach me at:
                <input
                  name="email"
                  type="email"
                  max={150}
                  placeholder="Your email address"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </p>
            <p>
              <label className="flex flex-col">
                And here's some info about my event:
                <textarea
                  name="description"
                  className="textarea textarea-bordered"
                  placeholder="Event description, guest numbers, location, favourite drinks.."
                ></textarea>
              </label>
            </p>
            <button className="btn btn-primary btn-md" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </section>
    </div>
  );
}
