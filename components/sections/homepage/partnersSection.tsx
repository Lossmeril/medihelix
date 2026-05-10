import Link from "next/link";

import { getCompanies } from "@/utils/getCompany";

import Badge from "@/components/badge";
import Carousel from "@/components/carousel";
import Section from "@/components/section";

export default async function PartnersSection() {
  const companies = await getCompanies();
  const withLogos = companies.filter((c) => c.logo);

  if (withLogos.length === 0) return null;

  return (
    <Section
      anchor="partneri"
      minHeight="content"
      theme="light"
      bgColor="#cecece1a"
      borderBottom
      borderTop
    >
      <div className="w-full text-center mb-3">
        <Badge>Naši partneři</Badge>
      </div>
      <h2 className="text-xl font-black text-black/80 uppercase tracking-wide text-center mb-8">
        PProdukty podle výrobců
      </h2>
      <Carousel>
        {withLogos.map((company) => (
          <Link
            key={company.slug}
            href={`/companies/${company.slug}`}
            className="flex items-center justify-center w-40 h-20 p-2 mx-5"
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
