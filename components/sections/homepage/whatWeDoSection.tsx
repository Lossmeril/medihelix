import Card from "@/components/card";
import Divider from "@/components/divider";
import Section from "@/components/section";

import SectionHeading from "./sectionHeading";

export default function WhatWeDoSection({
  title,
  paragraphs,
  bullets,
}: {
  title: string;
  paragraphs: readonly string[];
  bullets: readonly string[];
}) {
  return (
    <Section anchor="co-delame" minHeight="content">
      <SectionHeading>{title}</SectionHeading>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <Card className="shadow-sm">
          <div className="p-6 sm:p-8">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-dark/80 leading-relaxed">
                {p}
                {i < paragraphs.length - 1 && (
                  <Divider marginTop="1rem" marginBottom="1rem" />
                )}
              </p>
            ))}
          </div>
        </Card>

        <Card className="shadow-sm">
          <div className="p-6 sm:p-8">
            <h3 className="text-xl font-semibold mb-4">
              Jak probíhá spolupráce
            </h3>
            <ul className="space-y-3 text-dark/80">
              {bullets.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-sky" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </Section>
  );
}
