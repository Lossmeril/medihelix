import Link from "next/link";

import {
  ArrowRight,
  Headset,
  Microscope,
  Pipette,
  Settings,
  TestTubes,
  Wrench,
} from "lucide-react";

import { webButtonArrow } from "@/data/webGlobals";

import Badge from "@/components/badge";
import Section from "@/components/section";

import SectionHeading from "./sectionHeading";

interface ServiceCardProps {
  title: string;
  img: string;
  link: string;
  buttonText?: string;
  icon?: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  img,
  link,
  buttonText = "Naše nabídka",
  icon,
}) => {
  return (
    <div className="relative grid grid-cols-3 border border-gray-200 rounded-2xl h-32">
      {icon && (
        <div className="absolute top-0 left-0 -translate-1/2 text-sky p-2 rounded-lg bg-sky-100">
          {icon}
        </div>
      )}
      <div className="col-span-1 rounded-l-2xl overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt="Reagencie a spotřební matriál"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="col-span-2 text-left p-6 flex flex-col gap-2 justify-center">
        <h3 className="font-bold text-dark text-lg">{title}</h3>
        {/* <div className="text-xs text-gray-600 mt-2 text-balance mb-5">
          {description}
        </div> */}
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky font-bold text-sm"
        >
          {buttonText + " " + webButtonArrow}
        </Link>
      </div>
    </div>
  );
};

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
    <Section anchor="co-delame" minHeight="content" borderBottom>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="grid grid-cols-1 grid-rows-3 gap-6">
            <ServiceCard
              title="Reagencie a spotřební matriál"
              img="/img/stock/stock-7.jpg"
              link="#"
              icon={<Pipette size={24} />}
            />
            <ServiceCard
              title="Laboratorní přístroje"
              img="/img/stock/stock-4.jpg"
              link="#"
              icon={<Microscope size={24} />}
            />
            <ServiceCard
              title="Rychlé testy"
              img="/img/stock/stock-1.jpg"
              link="#"
              icon={<TestTubes size={24} />}
            />
          </div>
          <div className="lg:pr-4">
            <div className="w-full mb-3">
              <Badge>Poradce, partner, dodavatel</Badge>
            </div>
            <div className="mt-2 text-left">
              <SectionHeading>{title}</SectionHeading>
            </div>

            <div className="space-y-4 text-dark/80 leading-relaxed text-balance mb-5">
              {intro}
            </div>

            {/* <div className="text-sm text-balance text-dark/60 leading-relaxed">
              {rest}
            </div> */}

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
        </div>
      </div>
    </Section>
  );
}
