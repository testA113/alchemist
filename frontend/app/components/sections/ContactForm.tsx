import { Form } from "@remix-run/react";
import clsx from "clsx";

import type { ContactFormValues } from "./types";
import { Button } from "../shared/Actions/Button";

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
        <h1>{sectionData.title}</h1>
      </div>
      <Form method="post" action="/contact-us?index">
        <div className="flex flex-col gap-y-4">
          <p>
            <label className="flex flex-col">
              <div className="mb-2">{sectionData.namelabel}</div>
              <input
                name="name"
                type="text"
                max={100}
                placeholder={
                  sectionData.nameplaceholder
                    ? sectionData.nameplaceholder
                    : "Slim Shady"
                }
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </p>
          <p>
            <label className="flex flex-col">
              <div className="mb-2">{sectionData.emaillabel}</div>
              <input
                name="email"
                type="email"
                max={150}
                placeholder={
                  sectionData.emailplaceholder
                    ? sectionData.emailplaceholder
                    : "Your email address"
                }
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </p>
          <p>
            <label className="flex flex-col">
              <div className="mb-2">{sectionData.descriptionlabel}</div>
              <textarea
                name="description"
                className="textarea textarea-bordered"
                placeholder={
                  sectionData.descriptionplaceholder
                    ? sectionData.descriptionplaceholder
                    : "Event description, guest numbers, location, favourite drinks.."
                }
              ></textarea>
            </label>
          </p>
          <Button {...sectionData.submitbutton}>
            {sectionData.submitbutton.text}
          </Button>
        </div>
      </Form>
    </section>
  );
}
