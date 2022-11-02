import {
  type DynamicSectionValues,
  isVideoHeroValues,
  isLargeSummaryValues,
} from "./types";

import { VideoHero } from "./VideoHero";
import { LargeSummary } from "./LargeSummary";

type Props = {
  componentType: keyof Strapi.Schemas;
  sectionData: DynamicSectionValues;
};

export function Section({ sectionData }: Props) {
  if (isVideoHeroValues(sectionData)) {
    return <VideoHero sectionData={sectionData} />;
  }

  if (isLargeSummaryValues(sectionData)) {
    return <LargeSummary sectionData={sectionData} />;
  }

  return (
    <section className="flex items-center justify-center h-[150px] w-full bg-base-100">
      {sectionData.__component}
    </section>
  );
}
