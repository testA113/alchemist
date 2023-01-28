import Markdown from "markdown-to-jsx";
import clsx from "clsx";

import { StrapiImage } from "../shared/StrapiImage";

import type { SectionValues } from "./types";
import type { StrapiDataArray } from "~/types";

type Props = {
  sectionData: SectionValues<"sections.event-partners">;
};

// react component with a 3x2 grid of images that can be horizontally scrolled using embla-carousel
export function EventPartnerImages({ sectionData }: Props) {
  const partnersData = sectionData.clients as
    | StrapiDataArray<"api::client.client">
    | undefined;
  const partnersByImportance = partnersData?.data.sort(
    (i, j) => (j.attributes.importance || 0) - (i.attributes.importance || 0)
  );
  return (
    <section className="bg-base-100 px-10vw flex w-full !max-w-full flex-col items-center py-24">
      <div className="prose prose-lg md:prose-xl lg:prose-2xl mb-12">
        <Markdown>{sectionData.titleContent}</Markdown>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {partnersByImportance?.map((partner, index) => (
          <div
            key={index}
            className={clsx(
              "max-h-[130px] min-w-[100px] max-w-[130px] flex-[12%]"
            )}
          >
            {partner.attributes.websiteLink ? (
              <a
                href={partner.attributes?.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <StrapiImage
                  title={partner.attributes.name}
                  image={partner.attributes.image.data}
                  className="rounded-2xl object-contain transition duration-300 ease-in-out hover:scale-110"
                ></StrapiImage>
              </a>
            ) : (
              <StrapiImage
                title={partner.attributes.name}
                image={partner.attributes.image.data}
                className="rounded-2xl object-contain"
              ></StrapiImage>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
