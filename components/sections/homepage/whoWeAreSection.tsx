import { Handshake, Layers, Microscope, QuoteIcon, Zap } from "lucide-react";

import Badge from "@/components/badge";
import Card from "@/components/card";
import Section from "@/components/section";
import { UspPoint, UspSection } from "@/components/usp";

import SectionHeading from "./sectionHeading";

export default function WhoWeAreSection({
  title,
  paragraphs,
  uspPoints,
  promise,
}: {
  title: string;
  paragraphs: readonly string[];
  promise: string;
  uspPoints: readonly {
    title: string;
    description: string;
  }[];
}) {
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
    <Section anchor="o-nas" minHeight="content" borderBottom>
      <div className="w-full h-full absolute left-0 top-0 bg-linear-180 from-transparent to-sky/10 pointer-events-none select-none"></div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 pb-20 items-center gap-10 lg:gap-20">
        <div className="w-full text-center lg:text-right">
          <div className="w-full mb-3">
            <Badge>Společnost Medihelix</Badge>
          </div>
          <SectionHeading className="">{title}</SectionHeading>
          <div className="max-w-3xl mx-auto text-balance">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base sm:text-base text-dark/80 leading-relaxed mb-5"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="w-full h-full relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Product screenshot"
            src="/img/stock/stock-3.jpg"
            className="w-full h-60 lg:h-100 border border-[#eaeaea] object-cover max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-228 md:-ml-4 lg:-ml-0 mask-r-from-0% to-100%"
          />
          <div className="w-xs absolute -bottom-10 left-1/2 -translate-x-1/2">
            <Card theme="light" tip>
              <div className="p-6 pl-18">
                <span className="absolute left-2 top-2 translate-1/2 scale-200 text-sky opacity-20">
                  <QuoteIcon />
                </span>
                <p className="tracking-tight leading-wide text-balance">
                  {promise}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <UspSection uspPoints={mappedPoints} columnCount={4} />
    </Section>
  );
}
