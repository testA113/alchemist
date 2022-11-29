import Markdown from "markdown-to-jsx";
import clsx from "clsx";

import { Button } from "../shared/Button";
import type { LargeSummaryValues } from "./types";
import { ChevronRight } from "lucide-react";

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
      {sectionData.moreInfoButton && (
        <Button
          action={sectionData.moreInfoButton.url || ""}
          mode={sectionData.moreInfoButton.type}
          size={sectionData.moreInfoButton.size}
        >
          {sectionData.moreInfoButton.text}
          <ChevronRight />
        </Button>
      )}
    </section>
  );
}
