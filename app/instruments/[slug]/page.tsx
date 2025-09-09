// app/instruments/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { getInstruments } from "@/utils/getInstrument";
import Button from "@/components/button";
import Divider from "@/components/divider";

type Props = {
  params: { slug: string };
};

export default async function InstrumentPage({ params }: Props) {
  const param = await params;

  if (!param) {
    notFound();
  }

  const instruments = await getInstruments();
  const instrument = instruments.find((i) => i.slug === param.slug);

  if (!instrument) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 mt-40">
      {/* Hero section */}
      <header className="mb-12 gap-8 items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 justify-start">
          {instrument.hero_image && (
            <div className="relative w-full aspect-square">
              <Image
                src={instrument.hero_image}
                alt={instrument.title}
                fill
                className="object-contain rounded-xl shadow"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold mb-4">{instrument.title}</h1>
            <Divider />
            <p className="text-lg text-gray-600">{instrument.summary}</p>
            <div className="mt-6 flex gap-8 flex-col md:flex-row items-center">
              <Button href="#specs" label="Kontaktujte nás" />
              <Button
                href="#specs"
                label="Zobrazit specifikace"
                transparent
                inverted
                monochrome
              />
            </div>
          </div>
        </div>
      </header>

      {/* Gallery */}
      {instrument.gallery?.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Galerie</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {instrument.gallery.map((img, idx) => (
              <div
                key={idx}
                className="relative w-full aspect-[4/3] rounded-xl shadow"
              >
                <Image
                  src={img.image}
                  alt={`${instrument.title} image ${idx + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      {Array.isArray(instrument.features) && instrument.features.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Přednosti</h2>
          <ul className="space-y-3 grid grid-cols-2">
            {instrument.features.map((feature, idx) => (
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
      {Array.isArray(instrument.specs) && instrument.specs.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Specifikace</h2>
          <div className="grid grid-cols-1">
            {instrument.specs.map((s, idx) => (
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

      {/* Test menu */}
      {Array.isArray(instrument.test_menu) &&
        instrument.test_menu.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Nabídka testů</h2>
            <ul className="space-y-2">
              {instrument.test_menu.map((t, idx) => (
                <li
                  key={idx}
                  className="p-3 bg-white border rounded-md shadow-sm"
                >
                  <span className="font-medium">{t.name}</span>
                  {t.group && (
                    <span className="ml-2 text-sm text-gray-500">
                      ({t.group})
                    </span>
                  )}
                  {t.note && (
                    <p className="text-sm text-gray-600 mt-1">{t.note}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

      {/* Intended use */}
      {instrument.intended_use?.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Použití</h2>
          <ul className="list-disc text-gray-700">
            {instrument.intended_use.map((u, idx) => (
              <li key={idx}>
                {typeof u === "string"
                  ? u
                  : typeof u === "object" && "place" in u
                  ? u.place
                  : ""}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* SKU, tags, and downloads */}
      <footer className="border-t pt-8">
        <p className="font-medium">Objednací číslo: {instrument.sku}</p>
        {Array.isArray(instrument.tags) && instrument.tags.length > 0 && (
          <p className="text-sm text-gray-600 mt-2">
            Tagy: {instrument.tags.join(", ")}
          </p>
        )}
        {instrument.assets?.datasheet && (
          <a
            href={instrument.assets.datasheet}
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Stáhnout datový list
          </a>
        )}
        {instrument.assets?.external_url && (
          <a
            href={instrument.assets.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 inline-block mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Více informací
          </a>
        )}
      </footer>
    </main>
  );
}
