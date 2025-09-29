import { Subcategory, getSubcategories } from "./getSubcategory";

export const getSubcategoryTrail = async (slug: string) => {
  const categories = await getSubcategories();
  if (!categories) {
    return [];
  }
  const trail: Subcategory[] = [];
  let currentSlug = slug;

  while (currentSlug) {
    const category = categories.find((c) => c.slug === currentSlug);

    if (category) {
      trail.unshift(category);
      currentSlug = category.parent || "";
    } else {
      break;
    }
  }

  return trail;
};
