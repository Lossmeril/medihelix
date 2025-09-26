// app/instruments/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Balancer from "react-wrap-balancer";

import { getCompanies } from "@/utils/getCompany";
import { getInstruments } from "@/utils/getInstrument";

import { ProductCard } from "@/components/card";
import ContactForm from "@/components/contactForm";
import Divider from "@/components/divider";

type Props = {
  params: { company: string };
};

export default async function CompanyPage({ params }: Props) {
  const param = await params;

  if (!param) {
    notFound();
  }

  const companies = await getCompanies();
  const company = companies.find((c) => c.slug === param?.company);

  const instruments = await getInstruments();
  const companyInstruments = instruments.filter(
    (instrument) => instrument.companies[0].slug === param?.company,
  );

  if (!company) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-12 lg:px-4 py-12 mt-20 lg:mt-40">
      <nav className="mb-18 flex flex-col gap-2">
        {/* Company breadcrumb */}
        {company && (
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/companies" className="hover:underline text-sky-600">
              Výrobci
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/companies/${company.slug}`}
              className="hover:underline text-sky-600"
            >
              {company.name}
            </Link>
          </div>
        )}
      </nav>

      {/* Hero section */}
      <header className="mb-4 lg:mb-12 gap-8 items-center">
        <div className="flex flex-col gap-10 lg:gap-20 justify-start">
          <div>
            {company.logo && (
              <div className="relative h-20 w-40 mr-auto">
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">
              {company.name}
            </h1>
            <p className="text-base lg:text-lg text-gray-600">
              <Balancer>{company.description}</Balancer>
            </p>
            <Divider />

            <h2 className="text-xl lg:text-2xl font-bold mb-6">
              Produkty od {company.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyInstruments.map((instrument) => (
                <ProductCard
                  key={instrument.slug}
                  title={instrument.title}
                  summary={instrument.summary}
                  hero_image={instrument.hero_image}
                  slug={instrument.slug}
                  instrument_types={instrument.instrument_types}
                />
              ))}
              {companyInstruments.length === 0 && (
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
