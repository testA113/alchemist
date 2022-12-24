import Markdown from "markdown-to-jsx";
import type { SimpleContentValues } from "./types";

type Props = {
  sectionData: SimpleContentValues;
};

export function SimpleContent({ sectionData }: Props) {
  return (
    <section className="bg-base-100 px-10vw prose md:prose-lg lg:prose-xl flex max-w-max flex-col items-center justify-items-center pt-48 pb-24 text-center">
      <Markdown>{sectionData.content}</Markdown>
    </section>
  );
}
