import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getCompanies } from "@/utils/getCompany";
import { getConsumables } from "@/utils/getConsumable";
import { getSubcategories } from "@/utils/getSubcategory";
import { buildSubcategoryTrail } from "@/utils/subcategoryHelpers";

import { webCompanyName } from "@/data/webGlobals";

import {
  BreadcrumbsBlock,
  CompanyBreadcrumbs,
  ProductBreadcrumbs,
} from "@/components/breadcrumbs";
import Button from "@/components/button";
import ContactForm from "@/components/contactForm";
import Divider from "@/components/divider";
import ImageGallery from "@/components/imageGallery";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const param = await params;
  const consumables = await getConsumables();
  const con = consumables.find((c) => c.slug === param.slug);
  return {
    title: (con?.title ? con.title + " | " : "") + webCompanyName,
    description: con?.summary || "",
  };
}

export default async function ConsumablePage({ params }: Props) {
  const param = await params;

  const consumables = await getConsumables();
  const con = consumables.find((c) => c.slug === param.slug);

  const subcategories = await getSubcategories();
  const companies = await getCompanies();
  const company = companies.find((c) => c.slug === con?.companies[0]?.slug);

  if (!con) {
    notFound();
  }

  return (
    <>
      <main className="max-w-5xl mx-auto px-12 lg:px-4 py-12 mt-20 lg:mt-40">
        <BreadcrumbsBlock>
          <ProductBreadcrumbs
            type="Consumable"
            product={{ title: con.title, slug: con.slug }}
            subcategories={buildSubcategoryTrail(
              con.subcategories[0]?.slug ?? "",
              subcategories,
            )}
          />
          {company && con.companies.length > 0 && (
            <CompanyBreadcrumbs
              company={company}
              product={{ title: con.title }}
            />
          )}
        </BreadcrumbsBlock>

        {/* Hero + Gallery */}
        <header className="mb-4 lg:mb-12">
          <ImageGallery
            images={[con.hero_image, ...con.gallery.map((g) => g.image)]}
            title={con.title}
          >
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-4">
                {con.title}
              </h1>

              {company && con.companies.length > 0 && (
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
              <p className="text-base lg:text-lg text-gray-600">{con.summary}</p>

              {con.price && (
                <p className="mt-4 text-xl font-bold text-sky-700">
                  {con.price}
                </p>
              )}

              <div className="mt-6 flex gap-8 flex-row md:flex-col lg:flex-row justify-start items-center md:items-start lg:items-center">
                {con.assets?.eshop_url && (
                  <Button href={con.assets.eshop_url} label="Koupit v e-shopu" />
                )}
                <Button href="#contact" label="Kontaktujte nás" />
              </div>

              {Array.isArray(con.tags) && con.tags.length > 0 && (
                <p className="text-sm text-gray-600 mt-10 lg:mt-4">
                  Tagy:{" "}
                  {con.tags.map((tag, idx) => (
                    <Link
                      key={tag}
                      href={`/consumables?tag=${encodeURIComponent(tag)}`}
                    >
                      <span className="text-sky-500">
                        {tag}
                        {con.tags && idx < con.tags.length - 1 ? ", " : ""}
                      </span>
                    </Link>
                  ))}
                </p>
              )}
            </div>
          </ImageGallery>
        </header>

        {/* Features */}
        {Array.isArray(con.features) && con.features.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Přednosti</h2>
            <ul className="space-x-3 space-y-3 grid grid-cols-1 md:grid-cols-2">
              {con.features.map((feature, idx) => (
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

        {/* Specs */}
        {Array.isArray(con.specs) && con.specs.length > 0 && (
          <section id="specs" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Specifikace</h2>
            <div className="grid grid-cols-1">
              {con.specs.map((s, idx) => (
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

        {(con.assets?.datasheet || con.assets?.external_url || con.assets?.eshop_url) && (
          <Divider />
        )}

        <div className="flex flex-row gap-4 flex-wrap">
          {con.assets?.eshop_url && (
            <Button label="Koupit v e-shopu" href={con.assets.eshop_url} />
          )}
          {con.assets?.datasheet && (
            <Button
              label="Stáhnout datový list"
              href={con.assets.datasheet}
              transparent
              inverted
              monochrome
            />
          )}
          {con.assets?.external_url && (
            <Button
              label="Více informací"
              href={con.assets.external_url}
              transparent
              inverted
              monochrome
            />
          )}
        </div>

        <Divider />
        <div id="contact">
          <ContactForm product={{ name: con.title }} />
        </div>
      </main>
    </>
  );
}
