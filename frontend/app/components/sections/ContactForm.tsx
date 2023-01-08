import { useActionData, useSubmit, useTransition } from "@remix-run/react";
import clsx from "clsx";
import {
  useIsSubmitting,
  ValidatedForm,
  useIsValid,
} from "remix-validated-form";
import { useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Markdown from "markdown-to-jsx";

import { validator } from "~/routes/contact-us";
import type { SectionValues } from "./types";
import { Button } from "../shared/Actions/Button";
import type { ContactMessageActionData } from "~/routes/contact-us/types";
import { TextInput } from "../shared/Input/TextInput";
import { TextArea } from "../shared/Input/TextArea";

type Props = {
  sectionData: SectionValues<"sections.contact-form">;
};

export function ContactForm({ sectionData }: Props) {
  const submit = useSubmit();
  const [showSubmittingMinDelay, setShowSubmittingMinDelay] = useState(false);
  const [token, setToken] = useState<string | undefined>();
  const actionData = useActionData<ContactMessageActionData>();
  const isSubmitting = useIsSubmitting("contact-form");
  const transition = useTransition();
  const isValid = useIsValid("contact-form");
  const { values } = actionData ?? {};

  const { executeRecaptcha } = useGoogleReCaptcha();

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    // set the token to use to check verification later
    const token = await executeRecaptcha();
    setToken(token);
  }, [executeRecaptcha]);

  // You can use useEffect to trigger the verification as soon as the component being loaded
  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  // show the submitting state for at least 800ms
  const showSubmitting =
    showSubmittingMinDelay || isSubmitting || transition.state === "submitting";

  return (
    <section
      className={clsx(
        "bg-base-100 flex flex-col",
        "px-10vw w-full !max-w-full items-center py-12"
      )}
    >
      <div className="prose prose-lg md:prose-xl lg:prose-2xl mb-12">
        <Markdown>{sectionData.titleContent}</Markdown>
      </div>
      <ValidatedForm
        id="contact-form"
        method="post"
        action="/contact-us?index"
        className="w-full max-w-xl"
        onSubmit={(data, event) => {
          event.preventDefault();
          if (token) {
            setShowSubmittingMinDelay(true);
            setTimeout(() => {
              setShowSubmittingMinDelay(false);
            }, 800);
            const dataWithToken = { ...data, token };
            submit(dataWithToken, {
              action: "/contact-us?index",
              method: "post",
            });
          }
        }}
        validator={validator}
      >
        <div className="flex w-full flex-col gap-y-2" id="contact-form">
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
