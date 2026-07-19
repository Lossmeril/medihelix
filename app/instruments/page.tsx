import { Metadata } from "next";

import { getInstruments } from "@/utils/getInstrument";
import { getSubcategories } from "@/utils/getSubcategory";
import { getDescendantSlugs } from "@/utils/subcategoryHelpers";

import { BreadcrumbsBlock, ProductBreadcrumbs } from "@/components/breadcrumbs";
import Button from "@/components/button";
import { ProductCard } from "@/components/card";
import ContactForm from "@/components/contactForm";
import Divider from "@/components/divider";
import SubcategoryCard from "@/components/subcategoryCard";
import { TagFilter } from "@/components/tagFilter";

export const metadata: Metadata = {
  title: "Laboratorní přístroje Medihelix | Exkluzivní distributor",
  description:
    "Medihelix je exkluzivním distributorem PlexBio, Genes2Me a Nucleotica pro ČR. Přístroje pro molekulární diagnostiku, PCR, NGS a extrakci nukleových kyselin.",
};

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
        inst.subcategories.some((sub) => descendants.has(sub.slug)),
      ).length;
      return { cat, count };
    })
    .sort((a, b) => b.count - a.count)
    .filter(({ count }) => count > 0)
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
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Přístroje a laboratorní technika
            </h1>
            <p className="text-sky-600 font-semibold mb-4">
              Exkluzivní technologie pro laboratoře v České republice.
            </p>
            <p className="text-base lg:text-lg text-gray-600 text-balance">
              Medihelix je exkluzivním distributorem společností PlexBio,
              Genes2Me a Nucleotica pro Českou republiku. Nabízíme laboratorní
              přístroje pro molekulární diagnostiku, PCR, dPCR, NGS i
              point-of-care testování, spolu s odborným poradenstvím a
              technickou podporou.
            </p>
            <div className="mt-4 max-w-fit">
              <Button label="Domluvit odbornou konzultaci" href="#kontakt" />
            </div>
            {rootSubcategories.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Kategorie</h2>
                <div className="flex flex-wrap gap-2">
                  {rootSubcategories.map((cat) => (
                    <SubcategoryCard
                      key={cat.slug}
                      href={`/instruments/${cat.slug}`}
                      name={cat.name}
                      image={
                        instruments.find((inst) =>
                          inst.subcategories.some((sub) =>
                            getDescendantSlugs(
                              cat.slug,
                              subcategories,
                            ).includes(sub.slug),
                          ),
                        )?.hero_image ||
                        "/img/placeholders/instrument-placeholder.png"
                      }
                    />
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
                <p className="text-gray-500">Žádné produkty pro vybraný tag.</p>
              )}
            </div>
          </div>
        </div>
      </header>
      <ContactForm />
    </main>
  );
}
