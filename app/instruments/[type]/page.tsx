// app/instruments/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";

import Balancer from "react-wrap-balancer";

import { getInstruments } from "@/utils/getInstrument";
import { getInstrumentTypes } from "@/utils/getInstrumentTypes";

import { ProductCard } from "@/components/card";
import Divider from "@/components/divider";

type Props = {
  params: { type: string };
};

export default async function InstrumentTypePage({ params }: Props) {
  const param = await params;

  if (!param) {
    notFound();
  }

  const types = await getInstrumentTypes();
  const type = types.find((c) => c.slug === param?.type);

  const instruments = await getInstruments();
  const typedInstruments = instruments.filter(
    (instrument) => instrument.instrument_types[0].slug === param?.type,
  );

  if (!type) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-12 lg:px-4 py-12 mt-20 lg:mt-40">
      <nav className="mb-18 flex flex-col gap-2">
        {/* Type hierarchy breadcrumb */}
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/instruments" className="hover:underline text-sky-600">
            Instrumenty
          </Link>
          <span className="mx-2">/</span>
          {type ? (
            <>
              <Link
                href={`/instruments/${type.slug}`}
                className="hover:underline text-sky-600"
              >
                {type.name}
              </Link>
              <span className="mx-2">/</span>
            </>
          ) : null}
        </div>
      </nav>

      {/* Hero section */}
      <header className="mb-4 lg:mb-12 gap-8 items-center">
        <div className="flex flex-col gap-10 lg:gap-20 justify-start">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">{type.name}</h1>
            <p className="text-base lg:text-lg text-gray-600">
              <Balancer>{type.description}</Balancer>
            </p>
            <Divider />

            <h2 className="text-xl lg:text-2xl font-bold mb-6">
              Instrumenty spadající do kategorie {type.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {typedInstruments.map((instrument) => (
                <ProductCard
                  key={instrument.slug}
                  title={instrument.title}
                  summary={instrument.summary}
                  hero_image={instrument.hero_image}
                  slug={instrument.slug}
                  instrument_types={instrument.instrument_types}
                />
              ))}
              {typedInstruments.length === 0 && (
                <p className="text-gray-500">Žádné produkty k zobrazení.</p>
              )}
            </div>
          </div>
        </div>
      </header>
    </main>
  );
}
