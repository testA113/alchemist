import {
  type DynamicSectionValues,
  isVideoHeroValues,
  isLargeSummaryValues,
  isCarouselValues,
  isServicesShowcaseValues,
  isShowcaseValues,
  isEventPartnersValues,
  isContactFormValues,
  isSimpleContentValues,
} from "./types";

import { VideoHero } from "./VideoHero";
import { LargeSummary } from "./LargeSummary";
import { Carousel } from "./Carousel";
import { ServicesShowcase } from "./ServicesShowcase";
import { Showcase } from "./Showcase";
import { EventPartnerImages } from "./EventPartnerImages";
import { ContactForm } from "./ContactForm";
import { SimpleContent } from "./SimpleContent";

type Props = {
  sectionData: DynamicSectionValues;
};

export function Section({ sectionData }: Props) {
  if (isVideoHeroValues(sectionData)) {
    return <VideoHero sectionData={sectionData} />;
  }

  if (isLargeSummaryValues(sectionData)) {
    return <LargeSummary sectionData={sectionData} />;
  }

  if (isCarouselValues(sectionData)) {
    return <Carousel sectionData={sectionData} />;
  }

  if (
    isServicesShowcaseValues(sectionData) &&
    sectionData.services &&
    "data" in sectionData.services
  ) {
    return <ServicesShowcase sectionData={sectionData} />;
  }

  if (isShowcaseValues(sectionData)) {
    return <Showcase sectionData={sectionData} />;
  }

  if (isEventPartnersValues(sectionData)) {
    return <EventPartnerImages sectionData={sectionData} />;
  }

  if (isContactFormValues(sectionData)) {
    return <ContactForm sectionData={sectionData} />;
  }

  if (isSimpleContentValues(sectionData)) {
    return <SimpleContent sectionData={sectionData} />;
  }

  return (
    <section className="bg-base-100 flex h-[150px] w-full items-center justify-center">
      {sectionData.__component}
    </section>
  );
}
