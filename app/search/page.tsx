import { Metadata } from "next";
import Link from "next/link";

import { getCompanies } from "@/utils/getCompany";
import { getInstruments } from "@/utils/getInstrument";
import { getQuickTests } from "@/utils/getQuickTest";
import { getSubcategories } from "@/utils/getSubcategory";
import { buildSubcategoryTrail } from "@/utils/subcategoryHelpers";

import { webCompanyName } from "@/data/webGlobals";

import Card, { ProductCard } from "@/components/card";
import ContactForm from "@/components/contactForm";
import Divider from "@/components/divider";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { q } = await searchParams;
  const label = q?.trim() ? `„${q.trim()}" – Vyhledávání` : "Vyhledávání";
  return { title: `${label} | ${webCompanyName}` };
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const raw = q?.trim() ?? "";
  const terms = raw.toLowerCase().split(/\s+/).filter(Boolean);

  const [instruments, quickTests, companies, subcategories] = await Promise.all(
    [getInstruments(), getQuickTests(), getCompanies(), getSubcategories()],
  );

  const companyMap = new Map(companies.map((c) => [c.slug, c.name]));
  const subcatMap = new Map(subcategories.map((s) => [s.slug, s.name]));

  function matches(text: string): boolean {
    return terms.length > 0 && terms.every((t) => text.includes(t));
  }

  function relevance(title: string, fullText: string): number {
    let s = 0;
    const tl = title.toLowerCase();
    for (const t of terms) {
      if (tl.includes(t)) s += 10;
      s += (fullText.match(new RegExp(escapeRegExp(t), "g")) ?? []).length;
    }
    return s;
  }

  // ── Instruments ──────────────────────────────────────────────────────────────
  const matchedInstruments = instruments
    .map((inst) => {
      const text = [
        inst.title,
        inst.summary,
        inst.body,
        inst.sku,
        ...(inst.tags ?? []),
        ...inst.companies.map((c) => companyMap.get(c.slug) ?? c.slug),
        ...inst.subcategories.map((s) => subcatMap.get(s.slug) ?? s.slug),
        ...(inst.features ?? []).map(
          (f) => `${f.title} ${f.description ?? ""}`,
        ),
        ...(inst.specs ?? []).map((s) => `${s.name} ${s.value}`),
        ...(inst.test_groups ?? []).flatMap((g) => [
          g.name,
          ...g.tests.map((t) => t.name),
        ]),
      ]
        .join(" ")
        .toLowerCase();
      return { inst, score: relevance(inst.title, text), ok: matches(text) };
    })
    .filter((r) => r.ok)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.inst);

  // ── Quick tests ───────────────────────────────────────────────────────────────
  const matchedQuickTests = quickTests
    .map((qt) => {
      const text = [
        qt.title,
        qt.summary,
        qt.body,
        ...(qt.tags ?? []),
        ...qt.companies.map((c) => companyMap.get(c.slug) ?? c.slug),
        ...qt.subcategories.map((s) => subcatMap.get(s.slug) ?? s.slug),
        ...(qt.features ?? []).map((f) => `${f.title} ${f.description ?? ""}`),
        ...(qt.target_groups ?? []).flatMap((g) => [
          g.name,
          ...g.targets.map((t) => `${t.name} ${t.alias ?? ""}`),
        ]),
        ...(qt.groups ?? []).flatMap((g) => [
          g.name,
          ...g.items.map((i) =>
            [
              i.name,
              i.cat_no,
              i.specimen,
              i.format,
              i.cut_off,
              i.ce_mark,
              i.note,
            ]
              .filter(Boolean)
              .join(" "),
          ),
        ]),
      ]
        .join(" ")
        .toLowerCase();
      return { qt, score: relevance(qt.title, text), ok: matches(text) };
    })
    .filter((r) => r.ok)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.qt);

  // ── Companies ─────────────────────────────────────────────────────────────────
  const matchedCompanies = companies.filter((c) => {
    const text = `${c.name} ${c.description ?? ""} ${c.body}`.toLowerCase();
    return matches(text);
  });

  const total =
    matchedInstruments.length +
    matchedQuickTests.length +
    matchedCompanies.length;

  return (
    <main className="max-w-5xl mx-auto px-12 lg:px-4 py-12 mt-20 lg:mt-40">
      <header className="mb-10">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">
          {raw ? (
            <>
              Výsledky hledání:{" "}
              <span className="text-sky-600">&bdquo;{raw}&ldquo;</span>
            </>
          ) : (
            "Vyhledávání"
          )}
        </h1>
        {raw && (
          <p className="text-gray-500 text-sm">
            {total > 0
              ? `Nalezeno ${total} ${total === 1 ? "výsledek" : total < 5 ? "výsledky" : "výsledků"}`
              : "Žádné výsledky"}
          </p>
        )}
      </header>

      {/* Empty query */}
      {!raw && (
        <p className="text-gray-500">
          Zadejte hledaný výraz do vyhledávacího pole v navigaci.
        </p>
      )}

      {/* No results */}
      {raw && total === 0 && (
        <div className="py-12 text-center text-gray-500">
          <p className="text-lg mb-2">
            Pro dotaz &bdquo;{raw}&ldquo; nebyly nalezeny žádné výsledky.
          </p>
          <p className="text-sm">
            Zkuste použít jiná klíčová slova nebo{" "}
            <Link href="#kontakt" className="text-sky-600 hover:underline">
              nás kontaktujte
            </Link>
            .
          </p>
        </div>
      )}

      {/* ── Instruments ─────────────────────────────────────────── */}
      {matchedInstruments.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            Přístroje
            <span className="text-sm font-normal text-gray-400">
              {matchedInstruments.length}
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedInstruments.map((inst) => {
              const company = companies.find(
                (c) => c.slug === inst.companies[0]?.slug,
              );
              return (
                <ProductCard
                  key={inst.slug}
                  title={inst.title}
                  summary={inst.summary}
                  hero_image={inst.hero_image}
                  slug={inst.slug}
                  subcategories={inst.subcategories}
                  basePath="/instruments"
                  company={company}
                />
              );
            })}
          </div>
        </section>
      )}

      {matchedInstruments.length > 0 &&
        (matchedQuickTests.length > 0 || matchedCompanies.length > 0) && (
          <Divider />
        )}

      {/* ── Quick tests ─────────────────────────────────────────── */}
      {matchedQuickTests.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            Rychlotesty
            <span className="text-sm font-normal text-gray-400">
              {matchedQuickTests.length}
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedQuickTests.map((qt) => {
              const company = companies.find(
                (c) => c.slug === qt.companies[0]?.slug,
              );
              const categories = buildSubcategoryTrail(
                qt.subcategories[0]?.slug ?? "",
                subcategories,
              );
              return (
                <ProductCard
                  key={qt.slug}
                  title={qt.title}
                  summary={qt.summary}
                  hero_image={qt.hero_image}
                  slug={qt.slug}
                  subcategories={qt.subcategories}
                  basePath="/quick-tests"
                  company={company}
                  categories={categories}
                  price={qt.price}
                  eshop_url={qt.assets?.eshop_url}
                />
              );
            })}
          </div>
        </section>
      )}

      {matchedQuickTests.length > 0 && matchedCompanies.length > 0 && (
        <Divider />
      )}

      {/* ── Companies ───────────────────────────────────────────── */}
      {matchedCompanies.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            Výrobci
            <span className="text-sm font-normal text-gray-400">
              {matchedCompanies.length}
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchedCompanies.map((company) => (
              <Link key={company.slug} href={`/companies/${company.slug}`}>
                <Card className="shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="p-5 flex flex-col gap-3 h-full">
                    {company.logo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="h-8 object-contain object-left"
                      />
                    )}
                    <h3 className="font-semibold leading-tight">
                      {company.name}
                    </h3>
                    {company.description && (
                      <p className="text-sm text-gray-500 line-clamp-3">
                        {company.description}
                      </p>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Divider />
      <ContactForm />
    </main>
  );
}
