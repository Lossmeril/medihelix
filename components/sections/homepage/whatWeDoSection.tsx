import { ArrowRight, Headset, Settings, Wrench } from "lucide-react";

import Card from "@/components/card";
import Divider from "@/components/divider";
import Section from "@/components/section";

import SectionHeading from "./sectionHeading";

type WhatWeDoSectionProps = {
  title: string;
  paragraphs: readonly string[];
  bullets: readonly string[];
};

const icons = [Settings, ArrowRight, Wrench, Headset];

function splitBullet(bullet: string) {
  // Allows either "Title: description" or just "One-liner"
  const parts = bullet.split(":");
  if (parts.length >= 2) {
    const name = parts[0].trim();
    const description = parts.slice(1).join(":").trim();
    return { name, description };
  }
  return { name: bullet.trim(), description: "" };
}

export default function WhatWeDoSection({
  title,
  paragraphs,
  bullets,
}: WhatWeDoSectionProps) {
  const intro = paragraphs[0] ?? "";
  const rest = paragraphs.slice(1);

  const features = bullets.map((b, i) => {
    const Icon = icons[i] ?? ArrowRight;
    const { name, description } = splitBullet(b);

    return { name, description, Icon };
  });

  return (
    <Section anchor="co-delame" minHeight="content">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Two-column content inspired by Tailwind example */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: supporting paragraphs + features list */}
          <div className="lg:pr-4">
            <p className="text-sm font-semibold text-sky uppercase tracking-wide">
              Partner, poradce, dodavatel
            </p>
            <div className="mt-2 text-left">
              <SectionHeading>{title}</SectionHeading>
            </div>

            <div className="space-y-4 text-dark/80 leading-relaxed">
              {intro}
            </div>

            <dl className="mt-8 space-y-6">
              {features.map((f) => (
                <div key={f.name} className="relative pl-10">
                  <dt className="font-semibold text-dark">
                    <f.Icon
                      aria-hidden="true"
                      className="absolute left-0 top-0.5 h-5 w-5 text-sky"
                    />
                    {f.name}
                  </dt>
                  {f.description ? (
                    <dd className="mt-1 text-sm sm:text-base text-dark/70 leading-relaxed">
                      {f.description}
                    </dd>
                  ) : null}
                </div>
              ))}
            </dl>
          </div>

          {/* Right: visual panel (replace with real image later) */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Product screenshot"
              src="/img/stock/stock-3.jpg"
              className="w-3xl h-146 object-cover max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-228 md:-ml-4 lg:-ml-0 mask-r-from-0% to-100%"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
