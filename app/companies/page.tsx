import { Metadata } from "next";
import Link from "next/link";

import { getCompanies } from "@/utils/getCompany";
import { getConsumables } from "@/utils/getConsumable";
import { getInstruments } from "@/utils/getInstrument";
import { getQuickTests } from "@/utils/getQuickTest";

import { webCompanyName } from "@/data/webGlobals";

import ContactForm from "@/components/contactForm";
import Divider from "@/components/divider";

export const metadata: Metadata = {
  title: `Výrobci | ${webCompanyName}`,
  description:
    "Přehled výrobců a dodavatelů diagnostických přístrojů a rychlotestů, se kterými spolupracujeme.",
};

export default async function CompaniesPage() {
  const [companies, instruments, quickTests, consumables] = await Promise.all([
    getCompanies(),
    getInstruments(),
    getQuickTests(),
    getConsumables(),
  ]);

  const visibleCompanies = companies.filter((company) => {
    if (company.show_if_empty) return true;
    return (
      instruments.some((i) => i.companies.some((c) => c.slug === company.slug)) ||
      quickTests.some((qt) => qt.companies.some((c) => c.slug === company.slug)) ||
      consumables.some((con) => con.companies.some((c) => c.slug === company.slug))
    );
  });

  return (
    <main className="max-w-5xl mx-auto px-12 lg:px-4 py-12 mt-20 lg:mt-40">
      <header className="mb-10">
        <h1 className="text-2xl lg:text-3xl font-bold mb-3">Výrobci</h1>
        <p className="text-base lg:text-lg text-gray-600">
          Spolupracujeme s předními výrobci diagnostických přístrojů a
          rychlotestů. Kliknutím na výrobce zobrazíte jeho produkty.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleCompanies.map((company) => {
          const instrumentCount = instruments.filter((i) =>
            i.companies.some((c) => c.slug === company.slug),
          ).length;
          const qtCount = quickTests.filter((qt) =>
            qt.companies.some((c) => c.slug === company.slug),
          ).length;
          const consumableCount = consumables.filter((con) =>
            con.companies.some((c) => c.slug === company.slug),
          ).length;
          const totalCount = instrumentCount + qtCount + consumableCount;

          return (
            <Link
              key={company.slug}
              href={`/companies/${company.slug}`}
              className="group flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
            >
              {company.logo ? (
                <div className="flex items-center justify-center h-32 bg-gray-50 border-b border-gray-100 p-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-32 bg-gray-50 border-b border-gray-100">
                  <span className="text-2xl font-bold text-gray-300">
                    {company.name[0]}
                  </span>
                </div>
              )}

              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-lg font-semibold mb-2 group-hover:text-sky-600 transition-colors">
                  {company.name}
                </h2>
                {company.description && (
                  <p className="text-sm text-gray-500 leading-snug line-clamp-3 flex-1">
                    {company.description}
                  </p>
                )}
                <Divider marginTop="0.75rem" marginBottom="0.75rem" />
                <p className="text-xs text-gray-400">
                  {totalCount === 0
                    ? "Žádné produkty"
                    : `${totalCount} produkt${totalCount === 1 ? "" : totalCount < 5 ? "y" : "ů"}`}
                  {instrumentCount > 0 && qtCount > 0 && (
                    <span>
                      {" "}
                      · {instrumentCount} přístroj
                      {instrumentCount === 1
                        ? ""
                        : instrumentCount < 5
                          ? "e"
                          : "ů"}{" "}
                      · {qtCount} kit
                      {qtCount === 1 ? "" : qtCount < 5 ? "y" : "ů"}
                    </span>
                  )}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-16">
        <ContactForm />
      </div>
    </main>
  );
}
