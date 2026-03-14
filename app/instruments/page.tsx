// app/instruments/[slug]/page.tsx
import Link from "next/link";

import Balancer from "react-wrap-balancer";

import { getInstruments } from "@/utils/getInstrument";
import { getSubcategories } from "@/utils/getSubcategory";
import { getDescendantSlugs } from "@/utils/subcategoryHelpers";

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
  const subcategories = await getSubcategories();
  const rootSubcategories = subcategories
    .filter((c) => !c.parent)
    .map((cat) => {
      const descendants = new Set(getDescendantSlugs(cat.slug, subcategories));
      const count = instruments.filter((inst) =>
        inst.subcategories.some((sub) => descendants.has(sub.slug))
      ).length;
      return { cat, count };
    })
    .sort((a, b) => b.count - a.count)
    .map(({ cat }) => cat);

  const tagCounts = new Map<string, number>();
  for (const inst of instruments) {
    for (const t of inst.tags ?? []) {
      tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
    }
  }
  const allTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([t]) => t);

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
            {rootSubcategories.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Kategorie</h2>
                <div className="flex flex-wrap gap-2">
                  {rootSubcategories.map((cat) => (
                    <Link key={cat.slug} href={`/instruments/${cat.slug}`}>
                      <div className="grid grid-cols-2 h-20 justify-center items-center bg-sky-100 hover:bg-sky-200 transition-colors rounded-lg border border-sky-800/5 pr-6">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={
                            instruments.find((inst) =>
                              inst.subcategories.some((sub) =>
                                getDescendantSlugs(cat.slug, subcategories).includes(sub.slug)
                              )
                            )?.hero_image ||
                            "/img/placeholders/instrument-placeholder.png"
                          }
                          alt={cat.name}
                          className="h-20 aspect-square object-contain rounded-md"
                        />
                        <div className="">{cat.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
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
