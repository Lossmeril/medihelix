import { Handshake, Layers, Microscope, Zap } from "lucide-react";

import Divider from "@/components/divider";
import Section from "@/components/section";
import { UspPoint, UspSection } from "@/components/usp";

import SectionHeading from "./sectionHeading";

interface WhyUsSectionProps {
  title: string;
  lead: string;
  promise: string;
  uspPoints: readonly {
    title: string;
    description: string;
  }[];
}

export default function WhyUsSection({
  title,
  lead,
  promise,
  uspPoints,
}: WhyUsSectionProps) {
  // Map icons here (keeps data clean & CMS-ready)
  const icons = [Handshake, Microscope, Layers, Zap];

  const mappedPoints: UspPoint[] = uspPoints.map((point, index) => {
    const Icon = icons[index] ?? Handshake;

    return {
      ...point,
      icon: <Icon size={40} strokeWidth={1.5} />,
    };
  });

  return (
    <Section anchor="proc" minHeight="content">
      <SectionHeading>{title}</SectionHeading>

      <div className="max-w-3xl mx-auto text-center">
        <p className="text-base sm:text-lg text-dark/80 leading-relaxed">
          {lead}
        </p>
        <Divider marginTop="1.25rem" marginBottom="1.25rem" />
        <p className="text-base sm:text-lg text-dark font-semibold leading-relaxed">
          {promise}
        </p>
      </div>

      <UspSection uspPoints={mappedPoints} columnCount={4} />
    </Section>
  );
}
