import { Form, useActionData, useTransition } from "@remix-run/react";
import clsx from "clsx";

import type { ContactFormValues } from "./types";
import { Button } from "../shared/Actions/Button";
import type { ContactMessageActionData } from "~/routes/contact-us/types";
import { TextInput } from "../shared/Input/TextInput";
import { TextArea } from "../shared/Input/TextArea";
import { useState } from "react";

type Props = {
  sectionData: ContactFormValues;
};

export function ContactForm({ sectionData }: Props) {
  const [showSubmittingMinDelay, setShowSubmittingMinDelay] = useState(false);
  const actionData = useActionData<ContactMessageActionData>();
  const transition = useTransition();
  const { values, error } = actionData ?? {};

  // show the submitting state for at least 800ms
  const showSubmitting =
    showSubmittingMinDelay || transition.state === "submitting";

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
      <Form
        method="post"
        action="/contact-us?index"
        className="w-full max-w-xl"
        onSubmit={() => {
          setShowSubmittingMinDelay(true);
          setTimeout(() => {
            setShowSubmittingMinDelay(false);
          }, 800);
        }}
      >
        <fieldset disabled={transition.state === "submitting"}>
          <div className="flex w-full flex-col gap-y-2">
            <TextInput
              name="name"
              label={sectionData.namelabel}
              defaultValue={values?.name}
              type="text"
              maxLength={150}
              minLength={1}
              error={!showSubmitting ? error?.name : undefined}
              placeholder={
                sectionData.nameplaceholder
                  ? sectionData.nameplaceholder
                  : "Slim Shady"
              }
            />
            <TextInput
              name="email"
              label={sectionData.emaillabel}
              defaultValue={values?.email}
              type="text" // change to email
              maxLength={150}
              minLength={1}
              error={!showSubmitting ? error?.email : undefined}
              placeholder={
                sectionData.emailplaceholder
                  ? sectionData.emailplaceholder
                  : "Your email address"
              }
            />
            <TextArea
              name="description"
              label={sectionData.descriptionlabel}
              defaultValue={values?.description}
              maxLength={4000}
              minLength={10}
              error={!showSubmitting ? error?.description : undefined}
              placeholder={
                sectionData.descriptionplaceholder
                  ? sectionData.descriptionplaceholder
                  : "Event description, guest numbers, location, favourite drinks.."
              }
            />
            <Button {...sectionData.submitbutton} isLoading={showSubmitting}>
              {showSubmitting
                ? sectionData.submitbutton.loadingText ?? "Loading..."
                : sectionData.submitbutton.text}
            </Button>
          </div>
        </fieldset>
      </Form>
    </section>
  );
}
