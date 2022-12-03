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
        "flex flex-col bg-base-100",
        "w-full !max-w-full items-center py-24 px-10vw"
      )}
    >
      <div className="prose mb-12 md:prose-lg lg:prose-xl">
        <h1>{sectionData.title}</h1>
      </div>
    </section>
  );
}
