import { getCompanies } from "@/utils/getCompany";
import { getInstruments } from "@/utils/getInstrument";
import { getQuickTests } from "@/utils/getQuickTest";
import { getSubcategoryTrail } from "@/utils/getSubcategoryTrail";

import Badge from "@/components/badge";
import { ProductCard } from "@/components/card";
import Carousel from "@/components/carousel";
import Section from "@/components/section";

export default async function FeaturedProductsSection() {
  const [instruments, quickTests, companies] = await Promise.all([
    getInstruments(),
    getQuickTests(),
    getCompanies(),
  ]);

  const featuredInstruments = instruments.filter((i) => i.featured);
  const featuredQuickTests = quickTests.filter((qt) => qt.featured);

  const instrumentCards = await Promise.all(
    featuredInstruments.map(async (instrument) => {
      const categories = await getSubcategoryTrail(
        instrument.subcategories[0]?.slug,
      );
      const company = companies.find(
        (c) => c.slug === instrument.companies[0]?.slug,
      );
      return (
        <div key={instrument.slug} className="w-72 h-full">
          <ProductCard
            title={instrument.title}
            summary={instrument.summary}
            hero_image={instrument.hero_image}
            slug={instrument.slug}
            subcategories={instrument.subcategories}
            categories={categories}
            company={company}
          />
        </div>
      );
    }),
  );

  const qtCards = await Promise.all(
    featuredQuickTests.map(async (qt) => {
      const categories = await getSubcategoryTrail(qt.subcategories[0]?.slug);
      const company = companies.find((c) => c.slug === qt.companies[0]?.slug);
      return (
        <div key={qt.slug} className="w-72 h-full">
          <ProductCard
            title={qt.title}
            summary={qt.summary}
            hero_image={qt.hero_image}
            slug={qt.slug}
            subcategories={qt.subcategories}
            basePath="/quick-tests"
            categories={categories}
            company={company}
          />
        </div>
      );
    }),
  );

  const allCards = [...instrumentCards, ...qtCards];
  if (allCards.length === 0) return null;

  return (
    <Section anchor="produkty" minHeight="content">
      <div className="w-full text-center mb-3">
        <Badge>Náš katalog</Badge>
      </div>
      <h2 className="text-xl font-black text-black uppercase tracking-wide text-center mb-8">
        Vybrané produkty z naší nabídky
      </h2>
      <Carousel>{allCards}</Carousel>
    </Section>
  );
}
