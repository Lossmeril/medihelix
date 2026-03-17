import Divider from "@/components/divider";
import Section from "@/components/section";

import SectionHeading from "./sectionHeading";

export default function WhoWeAreSection({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: readonly string[];
}) {
  return (
    <Section anchor="kdo-jsme" minHeight="content">
      <SectionHeading className="text-center">{title}</SectionHeading>
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-base sm:text-base text-dark/80 leading-relaxed">
          {paragraphs.join(" ")}
        </p>
      </div>
    </Section>
  );
}
