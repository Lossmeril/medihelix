import { getConsumables } from "@/utils/getConsumable";
import { getSubcategories } from "@/utils/getSubcategory";
import { getDescendantSlugs } from "@/utils/subcategoryHelpers";

import { BreadcrumbsBlock, ProductBreadcrumbs } from "@/components/breadcrumbs";
import { ProductCard } from "@/components/card";
import ContactForm from "@/components/contactForm";
import Divider from "@/components/divider";
import SubcategoryCard from "@/components/subcategoryCard";
import { TagFilter } from "@/components/tagFilter";

type Props = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function ConsumablesPage({ searchParams }: Props) {
  const { tag } = await searchParams;
  const consumables = await getConsumables();
  const subcategories = await getSubcategories();

  const rootSubcategories = subcategories
    .filter((c) => !c.parent)
    .map((cat) => {
      const descendants = new Set(getDescendantSlugs(cat.slug, subcategories));
      const count = consumables.filter((con) =>
        con.subcategories.some((sub) => descendants.has(sub.slug)),
      ).length;
      return { cat, count };
    })
    .sort((a, b) => b.count - a.count)
    .filter(({ count }) => count > 0)
    .map(({ cat }) => cat);

  const tagCounts = new Map<string, number>();
  for (const con of consumables) {
    for (const t of con.tags ?? []) {
      tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
    }
  }
  const allTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([t]) => t);

  const filtered = tag
    ? consumables.filter((con) => con.tags?.includes(tag))
    : consumables;

  return (
    <main className="max-w-5xl mx-auto px-12 lg:px-4 py-12 mt-20 lg:mt-40">
      <BreadcrumbsBlock>
        <ProductBreadcrumbs type="Consumable" />
      </BreadcrumbsBlock>

      <header className="mb-4 lg:mb-12 gap-8 items-center">
        <div className="flex flex-col gap-10 lg:gap-20 justify-start">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">
              Reagencie a spotřební materiál
            </h1>
            <p className="text-base lg:text-lg text-gray-600 text-balance">
              Nabízíme široký sortiment reagencií a spotřebního materiálu pro
              laboratorní diagnostiku. Vyberte si z naší nabídky produktů od
              předních výrobců.
            </p>

            {rootSubcategories.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Kategorie</h2>
                <div className="flex flex-wrap gap-5">
                  {rootSubcategories.map((cat) => (
                    <SubcategoryCard
                      key={cat.slug}
                      href={`/consumables/${cat.slug}`}
                      name={cat.name}
                      image={
                        consumables.find((con) =>
                          con.subcategories.some((sub) =>
                            getDescendantSlugs(
                              cat.slug,
                              subcategories,
                            ).includes(sub.slug),
                          ),
                        )?.hero_image ||
                        "/img/placeholders/instrument-placeholder.png"
                      }
                    />
                  ))}
                </div>
              </div>
            )}
            <Divider />

            <h2 className="text-xl lg:text-2xl font-bold mb-6">
              Nabídka reagencií a spotřebního materiálu
            </h2>
            <TagFilter tags={allTags} basePath="/consumables" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((con) => (
                <ProductCard
                  key={con.slug}
                  title={con.title}
                  summary={con.summary}
                  hero_image={con.hero_image}
                  slug={con.slug}
                  subcategories={con.subcategories}
                  basePath="/consumables"
                  price={con.price}
                  eshop_url={con.assets?.eshop_url}
                />
              ))}
              {filtered.length === 0 && (
                <p className="text-gray-500 col-span-full">
                  {tag
                    ? "Žádné produkty pro vybraný tag."
                    : "Připravujeme nabídku. Brzy zde najdete naše produkty."}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>
      <ContactForm />
    </main>
  );
}
