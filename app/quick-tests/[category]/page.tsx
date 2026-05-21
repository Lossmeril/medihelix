import { notFound } from "next/navigation";

import { getCompanies } from "@/utils/getCompany";
import { getQuickTests } from "@/utils/getQuickTest";
import { Subcategory, getSubcategories } from "@/utils/getSubcategory";
import { getSubcategoryTrail } from "@/utils/getSubcategoryTrail";
import {
  buildSubcategoryTrail,
  getDescendantSlugs,
} from "@/utils/subcategoryHelpers";

import { BreadcrumbsBlock, ProductBreadcrumbs } from "@/components/breadcrumbs";
import { ProductCard } from "@/components/card";
import ContactForm from "@/components/contactForm";
import Divider from "@/components/divider";
import SubcategoryCard from "@/components/subcategoryCard";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function QuickTestCategoryPage({ params }: Props) {
  const param = await params;

  const subcategories = await getSubcategories();
  const subcategory = subcategories.find((c) => c.slug === param.category);

  const companies = await getCompanies();

  const subcategoryTrail: Subcategory[] = subcategory
    ? buildSubcategoryTrail(subcategory.slug, subcategories)
    : [];

  const quickTests = await getQuickTests();
  const descendantSlugs = new Set(
    getDescendantSlugs(param.category, subcategories),
  );
  const quickTestsInSubcat = quickTests.filter((qt) =>
    qt.subcategories.some((sub) => descendantSlugs.has(sub.slug)),
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
        <ProductBreadcrumbs type="Kit" subcategories={subcategoryTrail} />
      </BreadcrumbsBlock>

      <header className="mb-4 lg:mb-12 gap-8 items-center">
        <div className="flex flex-col gap-10 lg:gap-20 justify-start">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">
              {subcategory.name}
            </h1>
            <p className="text-base lg:text-lg text-gray-600 text-balance">
              {subcategory.description}
            </p>

            {childSubcategories.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">
                  Podkategorie v {subcategory.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {childSubcategories.map((child) => (
                    <SubcategoryCard
                      key={child.slug}
                      href={`/quick-tests/${child.slug}`}
                      name={child.name}
                      image={
                        quickTests.find((qt) =>
                          qt.subcategories.some(
                            (sub) => sub.slug === child.slug,
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
              Rychlotesty spadající do kategorie {subcategory.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickTestsInSubcat.map(async (qt) => (
                <ProductCard
                  key={qt.slug}
                  title={qt.title}
                  summary={qt.summary}
                  hero_image={qt.hero_image}
                  slug={qt.slug}
                  subcategories={qt.subcategories}
                  basePath="/quick-tests"
                  categories={await getSubcategoryTrail(
                    qt.subcategories[0].slug,
                  )}
                  company={companies.find(
                    (c) => c.slug === qt.companies[0]?.slug,
                  )}
                  price={qt.price}
                  eshop_url={qt.assets?.eshop_url}
                />
              ))}
              {quickTestsInSubcat.length === 0 && (
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
