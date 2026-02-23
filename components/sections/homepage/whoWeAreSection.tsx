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
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-base sm:text-base text-dark/80 leading-relaxed"
          >
            {p}
            {i < paragraphs.length - 1 && (
              <Divider marginTop="1.25rem" marginBottom="1.25rem" />
            )}
          </p>
        ))}
      </div>
    </Section>
  );
}
