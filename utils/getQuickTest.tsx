"use server";

import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type QuickTestVariant = {
  name: string;
  pack_sizes: {
    label: string; // e.g. "60 testů", "96 testů"
    sku: string;
  }[];
};

export type QuickTest = {
  slug: string;
  title: string;
  summary: string;
  companies: { slug: string }[];
  subcategories: { slug: string }[];
  featured: boolean;
  hero_image: string;
  gallery: { image: string }[];

  // Kit-specific classification
  technology?: string; // PCR, lateral flow, ELISA, …
  sample_types?: string[]; // fecal, serum, whole blood, …

  features?: { title: string; description?: string }[];

  // What the kit detects, optionally grouped into panels
  target_groups?: {
    name: string;
    targets: {
      name: string;
      alias?: string; // short code, e.g. "EBV"
      note?: string;
    }[];
  }[];

  // Ordering: one product family can have multiple orderable variants,
  // each available in multiple pack sizes with their own catalog numbers
  variants?: QuickTestVariant[];

  // For simple single-variant kits a plain SKU is enough
  sku?: string;

  specs?: { name: string; value: string; unit?: string }[];

  tags?: string[];

  assets?: {
    datasheet?: string;
    ifu?: string; // Instructions For Use — required field for IVD kits
    external_url?: string;
  };

  seo?: {
    meta_title?: string;
    meta_description?: string;
  };

  body: string;
};

export async function getQuickTests(): Promise<QuickTest[]> {
  const dir = path.join(process.cwd(), "content/quick-tests");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  return files
    .map((filename): QuickTest => {
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
        hero_image: data.hero_image || "",
        gallery: (data.gallery || []).map(
          (item: string | { image: string }) =>
            typeof item === "string" ? { image: item } : item,
        ),
        technology: data.technology || undefined,
        sample_types: data.sample_types || [],
        features: data.features || [],
        target_groups: data.target_groups || [],
        variants: data.variants || [],
        sku: data.sku || undefined,
        specs: data.specs || [],
        tags: data.tags || [],
        assets: data.assets || {},
        seo: data.seo || {},
        body: content,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}
