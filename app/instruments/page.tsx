// app/instruments/[slug]/page.tsx
import Balancer from "react-wrap-balancer";

import { getInstruments } from "@/utils/getInstrument";

import { BreadcrumbsBlock, ProductBreadcrumbs } from "@/components/breadcrumbs";
import { ProductCard } from "@/components/card";
import ContactForm from "@/components/contactForm";
import Divider from "@/components/divider";
import { TagFilter } from "@/components/tagFilter";

type Props = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function InstrumentsPage({ searchParams }: Props) {
  const { tag } = await searchParams;
  const instruments = await getInstruments();

  const allTags = Array.from(
    new Set(instruments.flatMap((i) => i.tags ?? []))
  ).sort();

  const filtered = tag
    ? instruments.filter((i) => i.tags?.includes(tag))
    : instruments;

  return (
    <main className="max-w-5xl mx-auto px-12 lg:px-4 py-12 mt-20 lg:mt-40">
      <BreadcrumbsBlock>
        <ProductBreadcrumbs type="Instrument" />
      </BreadcrumbsBlock>

      {/* Hero section */}
      <header className="mb-4 lg:mb-12 gap-8 items-center">
        <div className="flex flex-col gap-10 lg:gap-20 justify-start">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">
              Přístroje a laboratorní technika
            </h1>
            <p className="text-base lg:text-lg text-gray-600">
              <Balancer>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                quis lorem ut libero malesuada feugiat.
              </Balancer>
            </p>
            <Divider />

            <h2 className="text-xl lg:text-2xl font-bold mb-6">
              Nabídka přístrojů
            </h2>
            <TagFilter tags={allTags} basePath="/instruments" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((instrument) => (
                <ProductCard
                  key={instrument.slug}
                  title={instrument.title}
                  summary={instrument.summary}
                  hero_image={instrument.hero_image}
                  slug={instrument.slug}
                  subcategories={instrument.subcategories}
                />
              ))}
              {filtered.length === 0 && (
                <p className="text-gray-500">
                  Žádné produkty pro vybraný tag.
                </p>
              )}
            </div>
          </div>
        </div>
      </header>
      <ContactForm />
    </main>
  );
}
