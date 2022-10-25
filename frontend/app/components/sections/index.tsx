import { VideoHero } from "./VideoHero";

type ComponentKeys =
  | "sections.contact-form"
  | "sections.cyclingsentence"
  | "sections.full-size-carousel"
  | "sections.large-summary"
  | "sections.multi-round-image-view"
  | "sections.services-showcase"
  | "sections.video-hero";

type Props = {
  componentType: ComponentKeys;
  sectionData: any;
};

export function Section({ componentType, sectionData }: Props) {
  switch (componentType) {
    case "sections.video-hero":
      return <VideoHero sectionData={sectionData} />;
    default:
      return (
        <section className="flex items-center justify-center h-[150px] w-full bg-base-100">
          {componentType}
        </section>
      );
  }
}
