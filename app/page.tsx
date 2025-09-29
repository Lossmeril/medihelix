import Link from "next/link";

import { getCompanies } from "@/utils/getCompany";
import { getInstruments } from "@/utils/getInstrument";
import { getSubcategoryTrail } from "@/utils/getSubcategoryTrail";

import { webButtonArrow } from "@/data/webGlobals";

import Card, { ProductCard } from "@/components/card";
import ContactForm from "@/components/contactForm";
import HeroBanner from "@/components/heroBanner";
import Section from "@/components/section";

const HomePage = async () => {
  const instruments = await getInstruments();
  const companies = await getCompanies();

  const featuredInstruments = [...instruments].sort(
    (a, b) => Number(b.featured) - Number(a.featured),
  );

  return (
    <main>
      <HeroBanner />
      <Section>
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-balance uppercase font-heading text-center mb-8">
          Přístroje
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {featuredInstruments.map(async (instrument) => (
            <ProductCard
              key={instrument.slug}
              title={instrument.title}
              summary={instrument.summary}
              hero_image={instrument.hero_image}
              slug={instrument.slug}
              subcategories={instrument.subcategories}
              company={companies.find(
                (c) => c.slug === instrument.companies[0].slug,
              )}
              categories={await getSubcategoryTrail(
                instrument.subcategories[0].slug,
              )}
            />
          ))}
          {/* <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-white to-transparent z-10 "></div> */}
          <Link href="/instruments">
            <Card tip theme="light" className="">
              <div className="p-10 w-full h-full grid place-content-center bg-sky hover:bg-sky-600 text-white hover:scale-105 transition-all">
                <p className="font-bold text-4xl">
                  Více přístrojů {webButtonArrow}
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </Section>

      <Section anchor="partneri">
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-balance uppercase font-heading text-center mb-8">
          Naši dodavatelé
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {companies.map((company) => (
            <Link key={company.slug} href={`/companies/${company.slug}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={company.slug}
                src={company.logo || "/img/logos/head-blue.svg"}
                alt={company.name ? `Logo společnosti ${company.name}` : "Logo"}
                className="w-60 h-20 object-contain p-4 grayscale hover:filter-none transition duration-300"
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
