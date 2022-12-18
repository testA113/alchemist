import { useActionData } from "@remix-run/react";
import clsx from "clsx";
import { useIsSubmitting, ValidatedForm } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

import type { ContactFormValues } from "./types";
import { Button } from "../shared/Actions/Button";
import type { ContactMessageActionData } from "~/routes/contact-us/types";
import { TextInput } from "../shared/Input/TextInput";
import { TextArea } from "../shared/Input/TextArea";
import { useState } from "react";

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
        message: "A little description please! At least 10 characters.",
      })
      .max(4000, {
        message:
          "4000 characters maximum please. We can talk more about it soon.",
      }),
  })
);

type Props = {
  sectionData: ContactFormValues;
};

export function ContactForm({ sectionData }: Props) {
  const [showSubmittingMinDelay, setShowSubmittingMinDelay] = useState(false);
  const actionData = useActionData<ContactMessageActionData>();
  const isSubmitting = useIsSubmitting("contact-form");
  const { values, error } = actionData ?? {};

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
            placeholder={
              sectionData.descriptionplaceholder
                ? sectionData.descriptionplaceholder
                : "Event description, guest numbers, location, favourite drinks.."
            }
          />
          <Button
            {...sectionData.submitbutton}
            isLoading={showSubmitting}
            disabled={!!error}
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
