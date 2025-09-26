import Link from "next/link";

import { getCompanies } from "@/utils/getCompany";
import { getInstruments } from "@/utils/getInstrument";

import { ProductCard } from "@/components/card";
import ContactForm from "@/components/contactForm";
import HeroBanner from "@/components/heroBanner";
import Section from "@/components/section";

const HomePage = async () => {
  const instruments = await getInstruments();
  const companies = await getCompanies();

  return (
    <main>
      <HeroBanner />
      <Section>
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-balance uppercase font-heading text-center">
          Produkty
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {instruments.map((instrument) => (
            <ProductCard
              key={instrument.slug}
              title={instrument.title}
              summary={instrument.summary}
              hero_image={instrument.hero_image}
              slug={instrument.slug}
              instrument_types={instrument.instrument_types}
            />
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-balance uppercase font-heading text-center">
          Naši dodavatelé
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {companies.map((company) => (
            <Link key={company.slug} href={`/companies/${company.slug}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={company.slug}
                src={"uploads/" + (company.logo || "/img/logos/head-blue.svg")}
                alt={company.name ? `Logo společnosti ${company.name}` : "Logo"}
                className="w-full h-20 object-contain p-4 grayscale hover:filter-none transition duration-300"
              />
            </Link>
          ))}
        </div>
      </Section>
      <div className="max-w-5xl mx-auto px-12 lg:px-4 py-12">
        <ContactForm />
      </div>
    </main>
  );
};

export default HomePage;
