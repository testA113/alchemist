import { type DynamicSectionValues, isVideoHeroValues } from "./types";

import { VideoHero } from "./VideoHero";

type Props = {
  componentType: keyof Strapi.Schemas;
  sectionData: DynamicSectionValues;
};

export function Section({ sectionData }: Props) {
  if (isVideoHeroValues(sectionData)) {
    return <VideoHero sectionData={sectionData} />;
  }

  return (
    <section className="flex items-center justify-center h-[150px] w-full bg-base-100">
      {sectionData.__component}
    </section>
  );
}
