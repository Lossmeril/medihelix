import Link from "next/link";

import { getCompanies } from "@/utils/getCompany";

import Carousel from "@/components/carousel";
import Section from "@/components/section";

export default async function PartnersSection() {
  const companies = await getCompanies();
  const withLogos = companies.filter((c) => c.logo);

  if (withLogos.length === 0) return null;

  return (
    <Section anchor="partneri" minHeight="content" theme="light">
      <h2 className="text-xl font-semibold uppercase tracking-wide text-center mb-10">
        Naši partneři
      </h2>
      <Carousel>
        {withLogos.map((company) => (
          <Link
            key={company.slug}
            href={`/companies/${company.slug}`}
            className="flex items-center justify-center w-44 h-20 p-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={company.logo}
              alt={company.name}
              className="max-w-full max-h-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          </Link>
        ))}
      </Carousel>
    </Section>
  );
}
