import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Balancer from "react-wrap-balancer";

import { getCompanies } from "@/utils/getCompany";
import { getQuickTests } from "@/utils/getQuickTest";
import { getSubcategories } from "@/utils/getSubcategory";

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
            subcategories={subcategories}
          />
          {company && qt.companies.length > 0 && (
            <CompanyBreadcrumbs
              company={company}
              product={{ title: qt.title }}
            />
          )}
        </BreadcrumbsBlock>

        {/* Hero */}
        <header className="mb-4 lg:mb-12 gap-8 items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 justify-start">
            {qt.hero_image && (
              <div className="relative w-full aspect-square">
                <Image
                  src={qt.hero_image}
                  alt={qt.title}
                  fill
                  className="object-contain rounded-xl shadow"
                />
              </div>
            )}
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

              {qt.technology && (
                <p className="text-sm text-gray-500 mt-1">
                  Technologie: <span className="font-medium text-gray-700">{qt.technology}</span>
                </p>
              )}

              {qt.sample_types && qt.sample_types.length > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  Typ vzorku:{" "}
                  <span className="font-medium text-gray-700">
                    {qt.sample_types.join(", ")}
                  </span>
                </p>
              )}

              {qt.storage_temperature && (
                <p className="text-sm text-gray-500 mt-1">
                  Skladování:{" "}
                  <span className="font-medium text-gray-700">
                    {qt.storage_temperature}
                  </span>
                </p>
              )}

              <Divider />
              <p className="text-base lg:text-lg text-gray-600">{qt.summary}</p>

              <div className="mt-6 flex gap-8 flex-row md:flex-col lg:flex-row justify-start items-center md:items-start lg:items-center">
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
          </div>
        </header>

        {/* Gallery */}
        {qt.gallery?.length > 0 && (
          <section className="mt-12 lg:mt-0 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Galerie</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {qt.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-full aspect-[4/3] rounded-xl shadow"
                >
                  <Image
                    src={img.image}
                    alt={`${qt.title} image ${idx + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

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
                      <div className="text-xs text-gray-500">
                        <Balancer>
                          {group.targets
                            .map((t) =>
                              t.alias ? `${t.name} (${t.alias})` : t.name
                            )
                            .join(", ")}
                        </Balancer>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Performance */}
        {qt.performance &&
          Object.values(qt.performance).some(Boolean) && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                Výkonnostní parametry
              </h2>
              <div className="grid grid-cols-1">
                {qt.performance.turnaround_time && (
                  <div className="bg-gray-100 odd:bg-white grid grid-cols-2 border-b border-gray-200 px-4 py-2">
                    <h3 className="font-medium">Doba zpracování (TAT)</h3>
                    <p className="text-gray-700">{qt.performance.turnaround_time}</p>
                  </div>
                )}
                {qt.performance.sensitivity && (
                  <div className="bg-white odd:bg-gray-100 grid grid-cols-2 border-b border-gray-200 px-4 py-2">
                    <h3 className="font-medium">Senzitivita</h3>
                    <p className="text-gray-700">{qt.performance.sensitivity}</p>
                  </div>
                )}
                {qt.performance.specificity && (
                  <div className="bg-gray-100 odd:bg-white grid grid-cols-2 border-b border-gray-200 px-4 py-2">
                    <h3 className="font-medium">Specificita</h3>
                    <p className="text-gray-700">{qt.performance.specificity}</p>
                  </div>
                )}
              </div>
            </section>
          )}

        {/* Compatible systems */}
        {Array.isArray(qt.compatible_systems) &&
          qt.compatible_systems.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                Kompatibilní systémy
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {qt.compatible_systems.map((sys, idx) => (
                  <li key={idx}>{sys}</li>
                ))}
              </ul>
            </section>
          )}

        {/* Intended use */}
        {qt.intended_use?.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Použití</h2>
            <div className="flex flex-row flex-wrap lg:flex-nowrap gap-12 lg:gap-0 justify-start lg:justify-between">
              {qt.intended_use.map((use, idx) => (
                <h3
                  key={idx}
                  className="text-base lg:text-lg text-gray-700 relative pl-4 font-semibold"
                >
                  <span className="text-sky-500 font-bold text-4xl absolute -mt-[6px] scale-500 opacity-25 -z-10 left-3">
                    &bull;
                  </span>{" "}
                  {use.place}
                </h3>
              ))}
            </div>
          </section>
        )}

        {/* Variants & ordering */}
        {Array.isArray(qt.variants) && qt.variants.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Varianty a balení</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {qt.variants.map((variant, idx) => (
                <Card key={idx}>
                  <div className="p-4">
                    <h3 className="font-semibold mb-3">{variant.name}</h3>
                    <div className="grid grid-cols-1">
                      {variant.pack_sizes.map((pack, pIdx) => (
                        <div
                          key={pIdx}
                          className="grid grid-cols-2 border-b border-gray-200 py-2 text-sm last:border-0"
                        >
                          <span className="text-gray-600">{pack.label}</span>
                          <span className="font-mono text-gray-800">
                            {pack.sku}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Single SKU fallback */}
        {qt.sku && (!qt.variants || qt.variants.length === 0) && (
          <p className="font-medium text-sm mb-12">
            Objednací číslo: {qt.sku}
          </p>
        )}

        <Divider />
        <div className="flex flex-row gap-4">
          {qt.assets?.datasheet && (
            <Button label="Stáhnout datový list" href={qt.assets.datasheet} />
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
