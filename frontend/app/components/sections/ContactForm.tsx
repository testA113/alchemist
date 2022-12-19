import { useActionData } from "@remix-run/react";
import clsx from "clsx";
import {
  useIsSubmitting,
  ValidatedForm,
  useIsValid,
} from "remix-validated-form";
import { useState } from "react";
import { useHydrated } from "remix-utils";

import { validator } from "~/routes/contact-us";
import type { ContactFormValues } from "./types";
import { Button } from "../shared/Actions/Button";
import type { ContactMessageActionData } from "~/routes/contact-us/types";
import { TextInput } from "../shared/Input/TextInput";
import { TextArea } from "../shared/Input/TextArea";

type Props = {
  sectionData: ContactFormValues;
};

export function ContactForm({ sectionData }: Props) {
  let isHydrated = useHydrated();
  const [showSubmittingMinDelay, setShowSubmittingMinDelay] = useState(false);
  const actionData = useActionData<ContactMessageActionData>();
  const isSubmitting = useIsSubmitting("contact-form");
  const isValid = useIsValid("contact-form");
  const { values } = actionData ?? {};

  // show the submitting state for at least 800ms
  const showSubmitting = showSubmittingMinDelay || isSubmitting;

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
      <ValidatedForm
        noValidate={isHydrated} // disable browser validation for non js browsers
        id="contact-form"
        method="post"
        action="/contact-us?index"
        className="w-full max-w-xl"
        onSubmit={() => {
          setShowSubmittingMinDelay(true);
          setTimeout(() => {
            setShowSubmittingMinDelay(false);
          }, 800);
        }}
        validator={validator}
      >
        <div className="flex w-full flex-col gap-y-2">
          <TextInput
            name="name"
            label={sectionData.namelabel}
            defaultValue={values?.name}
            type="text"
            maxLength={150}
            minLength={1}
            isLoading={showSubmitting}
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
            type="email" // change to email
            maxLength={150}
            minLength={1}
            isLoading={showSubmitting}
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
            minLength={1}
            isLoading={showSubmitting}
            placeholder={
              sectionData.descriptionplaceholder
                ? sectionData.descriptionplaceholder
                : "Event description, guest numbers, location, favourite drinks.."
            }
          />
          <Button
            {...sectionData.submitbutton}
            isLoading={showSubmitting}
            disabled={!isValid}
          >
            {showSubmitting
              ? sectionData.submitbutton.loadingText ?? "Loading..."
              : sectionData.submitbutton.text}
          </Button>
        </div>
      </ValidatedForm>
    </section>
  );
}
