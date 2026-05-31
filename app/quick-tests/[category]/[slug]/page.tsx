import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getCompanies } from "@/utils/getCompany";
import { getQuickTests } from "@/utils/getQuickTest";
import { getSubcategories } from "@/utils/getSubcategory";
import { buildSubcategoryTrail } from "@/utils/subcategoryHelpers";

import { webCompanyName } from "@/data/webGlobals";

import {
  BreadcrumbsBlock,
  CompanyBreadcrumbs,
  ProductBreadcrumbs,
} from "@/components/breadcrumbs";
import Button from "@/components/button";
import Card from "@/components/card";
import ContactForm from "@/components/contactForm";
import Divider from "@/components/divider";
import ImageGallery from "@/components/imageGallery";
import { QuickTestTabs } from "@/components/quickTestTabs";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const param = await params;
  const quickTests = await getQuickTests();
  const qt = quickTests.find((q) => q.slug === param.slug);
  return {
    title: (qt?.title ? qt.title + " | " : "") + webCompanyName,
    description: qt?.summary || "",
  };
}

export default async function QuickTestPage({ params }: Props) {
  const param = await params;

  const quickTests = await getQuickTests();
  const qt = quickTests.find((q) => q.slug === param.slug);

  const subcategories = await getSubcategories();

  const companies = await getCompanies();
  const company = companies.find((c) => c.slug === qt?.companies[0]?.slug);

  if (!qt) {
    notFound();
  }

  return (
    <>
      <main className="max-w-5xl mx-auto px-12 lg:px-4 py-12 mt-20 lg:mt-40">
        <BreadcrumbsBlock>
          <ProductBreadcrumbs
            type="Kit"
            product={{ title: qt.title, slug: qt.slug }}
            subcategories={buildSubcategoryTrail(
              qt.subcategories[0]?.slug,
              subcategories,
            )}
          />
          {company && qt.companies.length > 0 && (
            <CompanyBreadcrumbs
              company={company}
              product={{ title: qt.title }}
            />
          )}
        </BreadcrumbsBlock>

        {/* Hero + Gallery */}
        <header className="mb-4 lg:mb-12">
          <ImageGallery
            images={[qt.hero_image, ...qt.gallery.map((g) => g.image)]}
            title={qt.title}
          >
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-4">
                {qt.title}
              </h1>

              {company && qt.companies.length > 0 && (
                <p>
                  Výrobce:
                  <Link
                    href={`/companies/${company.slug}`}
                    className="text-sky-600 hover:underline ml-2"
                  >
                    {company.name}
                  </Link>
                </p>
              )}

              <Divider />
              <p className="text-base lg:text-lg text-gray-600">{qt.summary}</p>

              {qt.price && (
                <p className="mt-4 text-xl font-bold text-sky-700">
                  {qt.price}
                </p>
              )}

              <div className="mt-6 flex gap-8 flex-row md:flex-col lg:flex-row justify-start items-center md:items-start lg:items-center">
                {qt.assets?.eshop_url && (
                  <Button href={qt.assets.eshop_url} label="Koupit v e-shopu" />
                )}
                <Button href="#contact" label="Kontaktujte nás" />
                <Button
                  href="#targets"
                  label="Zobrazit panely"
                  transparent
                  inverted
                  monochrome
                />
              </div>

              {Array.isArray(qt.tags) && qt.tags.length > 0 && (
                <p className="text-sm text-gray-600 mt-10 lg:mt-4">
                  Tagy:{" "}
                  {qt.tags.map((tag, idx) => (
                    <Link
                      key={tag}
                      href={`/quick-tests?tag=${encodeURIComponent(tag)}`}
                    >
                      <span className="text-sky-500">
                        {tag}
                        {qt.tags && idx < qt.tags.length - 1 ? ", " : ""}
                      </span>
                    </Link>
                  ))}
                </p>
              )}
            </div>
          </ImageGallery>
        </header>

        {/* Features */}
        {Array.isArray(qt.features) && qt.features.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Přednosti</h2>
            <ul className="space-x-3 space-y-3 grid grid-cols-1 md:grid-cols-2">
              {qt.features.map((feature, idx) => (
                <li key={idx} className="py-2">
                  <h3 className="font-medium">{feature.title}</h3>
                  {feature.description && (
                    <p className="text-gray-600 text-sm mt-1">
                      {feature.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Target groups / panels */}
        {Array.isArray(qt.target_groups) && qt.target_groups.length > 0 && (
          <section id="targets" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Detekované cíle</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {qt.target_groups.map((group, idx) => (
                <Card key={idx}>
                  <div className="h-full flex flex-col justify-start p-4">
                    <h3 className="font-medium mb-2">{group.name}</h3>
                    {group.targets && (
                      <div className="text-xs text-gray-500 text-balance">
                        {group.targets
                          .map((t) =>
                            t.alias ? `${t.name} (${t.alias})` : t.name,
                          )
                          .join(", ")}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Specs */}
        {Array.isArray(qt.specs) && qt.specs.length > 0 && (
          <section id="specs" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Specifikace</h2>
            <div className="grid grid-cols-1">
              {qt.specs.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 odd:bg-white grid grid-cols-2 border-b border-gray-200 px-4 py-2"
                >
                  <h3 className="font-medium">{s.name}</h3>
                  <p className="text-gray-700">
                    {s.value} {s.unit}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <QuickTestTabs groups={qt.groups ?? []} />
        {qt.table_note && (
          <p className="text-sm text-gray-600 -mt-6 mb-12">{qt.table_note}</p>
        )}

        {qt.assets?.datasheet || qt.assets?.external_url || qt.assets?.ifu ? (
          <Divider />
        ) : null}

        <div className="flex flex-row gap-4 flex-wrap">
          {qt.assets?.eshop_url && (
            <Button label="Koupit v e-shopu" href={qt.assets.eshop_url} />
          )}
          {qt.assets?.datasheet && (
            <Button
              label="Stáhnout datový list"
              href={qt.assets.datasheet}
              transparent
              inverted
              monochrome
            />
          )}
          {qt.assets?.ifu && (
            <Button
              label="Návod k použití (IFU)"
              href={qt.assets.ifu}
              transparent
              inverted
              monochrome
            />
          )}
          {qt.assets?.external_url && (
            <Button
              label="Více informací"
              href={qt.assets.external_url}
              transparent
              inverted
              monochrome
            />
          )}
        </div>
        <Divider />
        <div id="contact">
          <ContactForm product={{ name: qt.title }} />
        </div>
      </main>
    </>
  );
}
