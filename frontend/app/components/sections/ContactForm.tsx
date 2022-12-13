import { Form, useActionData } from "@remix-run/react";
import clsx from "clsx";

import type { ContactFormValues } from "./types";
import { Button } from "../shared/Actions/Button";
import type { ContactMessageActionData } from "~/routes/contact-us/types";

type Props = {
  sectionData: ContactFormValues;
};

export function ContactForm({ sectionData }: Props) {
  const actionData = useActionData<ContactMessageActionData>();
  console.log(actionData?.values?.name);
  console.log(actionData?.error);
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
          <div>
            <label className="flex flex-col">
              <div className="mb-2">{sectionData.namelabel}</div>
              <input
                name="name"
                defaultValue={actionData?.values?.name}
                type="text"
                maxLength={150}
                minLength={1}
                placeholder={
                  sectionData.nameplaceholder
                    ? sectionData.nameplaceholder
                    : "Slim Shady"
                }
                className="input border-1 focus:border-primary bg-base-200 w-full max-w-xs border-gray-500"
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col">
              <div className="mb-2">{sectionData.emaillabel}</div>
              <input
                name="email"
                defaultValue={actionData?.values?.email}
                type="text"
                max={150}
                placeholder={
                  sectionData.emailplaceholder
                    ? sectionData.emailplaceholder
                    : "Your email address"
                }
                className="input border-1 focus:border-primary bg-base-200 w-full max-w-xs border-gray-500"
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col">
              <div className="mb-2">{sectionData.descriptionlabel}</div>
              <textarea
                name="description"
                defaultValue={actionData?.values?.description}
                className="textarea border-1 focus:border-primary bg-base-200 w-full max-w-xs border-gray-500"
                placeholder={
                  sectionData.descriptionplaceholder
                    ? sectionData.descriptionplaceholder
                    : "Event description, guest numbers, location, favourite drinks.."
                }
              ></textarea>
            </label>
          </div>
          <Button {...sectionData.submitbutton}>
            {sectionData.submitbutton.text}
          </Button>
        </div>
      </Form>
    </section>
  );
}
