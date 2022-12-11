import { Form } from "@remix-run/react";
import clsx from "clsx";

import type { ContactFormValues } from "./types";

type Props = {
  sectionData: ContactFormValues;
};

export function ContactForm({ sectionData }: Props) {
  console.log(sectionData);
  return (
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
  );
}
