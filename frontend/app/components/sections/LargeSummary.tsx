import Markdown from "markdown-to-jsx";
import clsx from "clsx";

import type { LargeSummaryValues } from "./types";
import { ChevronRight } from "lucide-react";
import { LinkButton } from "../shared/Actions/LinkButton";

type Props = {
  sectionData: LargeSummaryValues;
};

export function LargeSummary({ sectionData }: Props) {
  return (
    <section
      className={clsx(
        "flex max-w-max flex-col items-center justify-items-center bg-base-100 px-10vw pt-48 pb-24 text-center",
        "prose md:prose-lg lg:prose-xl"
      )}
    >
      <Markdown>{sectionData.summarytext}</Markdown>
      {sectionData.moreInfoLink && (
        <LinkButton {...sectionData.moreInfoLink}>
          {sectionData.moreInfoLink.text}
        </LinkButton>
      )}
    </section>
  );
}
