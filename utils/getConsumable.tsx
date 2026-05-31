"use server";

import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type Consumable = {
  slug: string;
  title: string;
  summary: string;
  companies: { slug: string }[];
  subcategories: { slug: string }[];
  featured: boolean;
  visible: boolean;
  hero_image: string;
  gallery: { image: string }[];
  features?: { title: string; description?: string }[];
  specs?: { name: string; value: string; unit?: string }[];
  tags?: string[];
  price?: string;
  assets?: {
    datasheet?: string;
    external_url?: string;
    eshop_url?: string;
  };
  seo?: {
    meta_title?: string;
    meta_description?: string;
  };
  body: string;
};

export async function getConsumables(): Promise<Consumable[]> {
  const dir = path.join(process.cwd(), "content/consumables");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  return files
    .map((filename): Consumable => {
      const fileContent = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(fileContent);
      return {
        slug: data.slug || filename.replace(/\.md$/, ""),
        title: data.title || "",
        summary: data.summary || "",
        companies: Array.isArray(data.companies)
          ? data.companies
          : data.companies
            ? [{ slug: data.companies }]
            : [],
        subcategories: data.subcategories || [],
        featured: data.featured || false,
        visible: data.visible !== false,
        hero_image: data.hero_image || "",
        gallery: (data.gallery || []).map(
          (item: string | { image: string }) =>
            typeof item === "string" ? { image: item } : item,
        ),
        features: data.features || [],
        specs: data.specs || [],
        tags: data.tags || [],
        price: data.price || undefined,
        assets: data.assets || {},
        seo: data.seo || {},
        body: content,
      };
    })
    .filter((c) => c.visible)
    .sort((a, b) => a.title.localeCompare(b.title));
}
