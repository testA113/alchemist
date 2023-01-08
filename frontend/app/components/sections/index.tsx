import { type DynamicSectionValues, isSectionValues } from "./types";

import { VideoHero } from "./VideoHero";
import { LargeSummary } from "./LargeSummary";
import { Carousel } from "./Carousel";
import { ServicesShowcase } from "./ServicesShowcase";
import { Showcases } from "./Showcases";
import { EventPartnerImages } from "./EventPartnerImages";
import { ContactForm } from "./ContactForm";
import { SimpleContent } from "./SimpleContent";
import { ImageTitle } from "./ImageTitle";
import { Testimonials } from "./Testimonials";

type Props = {
  sectionData: DynamicSectionValues;
};

export function Section({ sectionData }: Props) {
  if (isSectionValues(sectionData, "sections.video-hero")) {
    return <VideoHero sectionData={sectionData} />;
  }

  if (isSectionValues(sectionData, "sections.large-summary")) {
    return <LargeSummary sectionData={sectionData} />;
  }

  if (isSectionValues(sectionData, "sections.full-size-carousel")) {
    return <Carousel sectionData={sectionData} />;
  }

  if (
    isSectionValues(sectionData, "sections.services-showcase") &&
    sectionData.services &&
    "data" in sectionData.services
  ) {
    return <ServicesShowcase sectionData={sectionData} />;
  }

  if (isSectionValues(sectionData, "sections.showcases")) {
    return <Showcases sectionData={sectionData} />;
  }

  if (isSectionValues(sectionData, "sections.event-partners")) {
    return <EventPartnerImages sectionData={sectionData} />;
  }

  if (isSectionValues(sectionData, "sections.contact-form")) {
    return <ContactForm sectionData={sectionData} />;
  }

  if (isSectionValues(sectionData, "sections.simple-content")) {
    return <SimpleContent sectionData={sectionData} />;
  }

  if (isSectionValues(sectionData, "sections.image-title")) {
    return <ImageTitle sectionData={sectionData} />;
  }

  if (
    isSectionValues(sectionData, "sections.testimonials") &&
    sectionData.testimonials &&
    "data" in sectionData.testimonials
  ) {
    return <Testimonials sectionData={sectionData} />;
  }

  return (
    <section className="bg-base-100 flex h-[150px] w-full items-center justify-center">
      {sectionData.__component}
    </section>
  );
}
