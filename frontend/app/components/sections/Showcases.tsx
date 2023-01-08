import clsx from "clsx";
import { Link } from "@remix-run/react";

import type { Showcase as ShowcaseType } from "./types";
import { ImageCard } from "../shared/ImageCard";

import type { SectionValues } from "./types";
import Markdown from "markdown-to-jsx";

type ShowcaseData = {
  data: ShowcaseType[];
};

type Props = {
  sectionData: SectionValues<"sections.showcases">;
};

export function Showcases({ sectionData }: Props) {
  const showcases = sectionData.showcases as ShowcaseData | undefined;
  return (
    <section className="bg-base-100 px-10vw flex w-full !max-w-full flex-col items-center py-24">
      <div className="prose prose-lg md:prose-xl lg:prose-2xl mb-12">
        <Markdown>{sectionData.titleContent}</Markdown>
      </div>
      <div className="mb-8 flex w-full flex-wrap gap-8">
        {showcases?.data.map((showcase, index) => (
          <div
            key={index}
            className={clsx(
              "group min-h-min min-w-[200px] flex-1 transform transition duration-300 ease-out hover:scale-105 md:hover:scale-100",
              isModTwoOrThree(index) ? "flex-[40%]" : "flex-[50%]"
            )}
          >
            <Link
              to={`${sectionData.seeMoreButton.to}/${showcase.attributes.slug}`}
              prefetch="intent"
            >
              <ImageCard
                imageUrl={
                  showcase.attributes.imageTitle.image?.data.attributes.formats
                    ?.medium.url
                }
                imageClasses="group-hover:opacity-90"
                childClasses="h-full px-8 py-16 bg-base-100 bg-opacity-50 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-hover:bg-opacity-50 transition ease-out transform duration-300"
              >
                <h3 className="text-base-content font-suez mb-3 text-xl font-medium sm:text-2xl">
                  {showcase.attributes.name}
                </h3>
                <p className="line-clamp-3 mb-3 leading-relaxed">
                  {showcase.attributes.summary}
                </p>
                <div className="flex flex-wrap justify-center gap-1">
                  {showcase.attributes.services.data.map((service, index) => (
                    <div
                      key={index}
                      className="badge line-clamp-1 bg-opacity-50"
                    >
                      {service.attributes.name}
                    </div>
                  ))}
                </div>
              </ImageCard>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function isModTwoOrThree(index: number) {
  // 1 or 2 because of starting at index 0
  return index % 4 === 1 || index % 4 === 2;
}
