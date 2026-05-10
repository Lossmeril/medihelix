import { Subcategory } from "./getSubcategory";

// Returns the slug of the given category plus all its descendants at any depth.
export function getDescendantSlugs(slug: string, all: Subcategory[]): string[] {
  const children = all.filter((c) => c.parent === slug);
  return [slug, ...children.flatMap((c) => getDescendantSlugs(c.slug, all))];
}

// Builds the full ancestor trail from root down to the given slug.
// Use this when you already have the subcategories array loaded.
export function buildSubcategoryTrail(
  slug: string,
  all: Subcategory[],
): Subcategory[] {
  const trail: Subcategory[] = [];
  let current = slug;
  while (current) {
    const cat = all.find((c) => c.slug === current);
    if (cat) {
      trail.unshift(cat);
      current = cat.parent || "";
    } else break;
  }
  return trail;
}
