import Badge from "@/components/badge";
import Divider from "@/components/divider";
import Section from "@/components/section";

import SectionHeading from "./sectionHeading";

export default function BlogSection({}) {
  return (
    <Section anchor="blog" minHeight="content">
      <div className="w-full h-full absolute left-0 top-0 bg-linear-180 from-transparent to-black/5"></div>
      <div className="w-full text-left mb-3">
        <Badge>Aktuality</Badge>
      </div>
      <SectionHeading className="text-left">Buďte v obraze</SectionHeading>
    </Section>
  );
}
