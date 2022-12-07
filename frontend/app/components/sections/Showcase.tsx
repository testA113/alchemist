import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { Button } from "../shared/Actions/Button";
import { Link } from "@remix-run/react";

import type { Showcase as ShowcaseType } from "../shared/types";
import { ImageCard } from "../shared/ImageCard";

import type { ShowcaseValues } from "./types";

type ShowcaseData = {
  data: ShowcaseType[];
};

type Props = {
  sectionData: ShowcaseValues;
};

export function Showcase({ sectionData }: Props) {
  const showcases = sectionData.showcases as ShowcaseData | undefined;
  return (
    <section
      className={clsx(
        "flex flex-col bg-base-100",
        "w-full !max-w-full items-center py-24 px-10vw"
      )}
    >
      <div className="prose mb-12 md:prose-lg lg:prose-xl">
        {sectionData.title && <h1>{sectionData.title}</h1>}
        {sectionData.description && <h3>{sectionData.description}</h3>}
      </div>
      <div className="mb-8 flex w-full flex-wrap gap-8">
        {showcases?.data.map((showcase, index) => (
          <div
            key={index}
            className={clsx(
              "group min-h-min min-w-[200px] flex-1 hover:scale-105 md:hover:scale-100 transition ease-out transform duration-300",
              isModTwoOrThree(index) ? "flex-[30%]" : "flex-[60%]"
            )}
          >
            <Link
              to={`${sectionData.seeMoreButton.to}/${showcase.attributes.slug}`}
            >
              <ImageCard
                imageUrl={
                  showcase.attributes.hero.data.attributes.formats?.medium.url
                }
                imageClasses="group-hover:opacity-90"
                childClasses="h-full px-8 py-16 bg-base-100 bg-opacity-50 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-hover:bg-opacity-50 transition ease-out transform duration-300"
              >
                <h1 className="mb-3 text-xl font-medium text-base-content sm:text-2xl">
                  {showcase.attributes.name}
                </h1>
                <p className="leading-relaxed line-clamp-3 mb-3">
                  {showcase.attributes.summary}
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
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
