// app/instruments/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";

import Balancer from "react-wrap-balancer";

import { getCompanies } from "@/utils/getCompany";
import { getInstruments } from "@/utils/getInstrument";
import { Subcategory, getSubcategories } from "@/utils/getSubcategory";
import { getSubcategoryTrail } from "@/utils/getSubcategoryTrail";

import { BreadcrumbsBlock, ProductBreadcrumbs } from "@/components/breadcrumbs";
import { ProductCard } from "@/components/card";
import ContactForm from "@/components/contactForm";
import Divider from "@/components/divider";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function InstrumentTypePage({ params }: Props) {
  const param = await params;

  const subcategories = await getSubcategories();
  const subcategory = subcategories.find((c) => c.slug === param?.category);

  const companies = await getCompanies();

  // Get all the subcategories for breadcrumb trail
  const subcategoryTrail: Subcategory[] = subcategory?.parent
    ? [
        ...(subcategories.find((c) => c.slug === subcategory?.parent)
          ? [subcategories.find((c) => c.slug === subcategory?.parent)]
          : []),
        subcategory,
      ].filter((c): c is Subcategory => c !== undefined)
    : [subcategory].filter((c): c is Subcategory => c !== undefined);

  const instruments = await getInstruments();
  const instrumentsInSubcat = instruments.filter((instrument) =>
    instrument.subcategories.some(
      (subcat) =>
        subcat.slug === param?.category ||
        [subcategories.find((c) => c.slug === subcat.slug)?.parent].includes(
          param?.category,
        ),
    ),
  );

  const childSubcategories = subcategories.filter(
    (c) => c.parent === subcategory?.slug,
  );

  if (!subcategory) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-12 lg:px-4 py-12 mt-20 lg:mt-40">
      <BreadcrumbsBlock>
        <ProductBreadcrumbs subcategories={subcategoryTrail} />
      </BreadcrumbsBlock>

      {/* Hero section */}
      <header className="mb-4 lg:mb-12 gap-8 items-center">
        <div className="flex flex-col gap-10 lg:gap-20 justify-start">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">
              {subcategory.name}
            </h1>
            <p className="text-base lg:text-lg text-gray-600">
              <Balancer>{subcategory.description}</Balancer>
            </p>
            {childSubcategories.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">
                  Podkategorie v {subcategory.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {childSubcategories.map((child) => (
                    <Link key={child.slug} href={`/instruments/${child.slug}`}>
                      <div className="grid grid-cols-2 h-20 justify-center items-center bg-sky-100 hover:bg-sky-200 transition-colors rounded-lg border border-sky-800/5 pr-6">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={
                            instruments.find((inst) =>
                              inst.subcategories.some(
                                (sub) => sub.slug === child.slug,
                              ),
                            )?.hero_image ||
                            "/img/placeholders/instrument-placeholder.png"
                          }
                          alt={child.name}
                          className="h-20 aspect-square object-contain rounded-md"
                        />
                        <div className="">{child.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <Divider />

            <h2 className="text-xl lg:text-2xl font-bold mb-6">
              Přístroje spadající do kategorie {subcategory.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {instrumentsInSubcat.map(async (instrument) => (
                <ProductCard
                  key={instrument.slug}
                  title={instrument.title}
                  summary={instrument.summary}
                  hero_image={instrument.hero_image}
                  slug={instrument.slug}
                  subcategories={instrument.subcategories}
                  categories={await getSubcategoryTrail(
                    instrument.subcategories[0].slug,
                  )}
                  company={companies.find(
                    (c) => c.slug === instrument.companies[0].slug,
                  )}
                />
              ))}
              {instrumentsInSubcat.length === 0 && (
                <p className="text-gray-500">Žádné produkty k zobrazení.</p>
              )}
            </div>
          </div>
        </div>
      </header>
      <ContactForm />
    </main>
  );
}
