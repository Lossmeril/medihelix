"use server";

import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type QuickTestItem = {
  name: string;
  cat_no: string;
  specimen?: string;
  format?: string;
  cut_off?: string;
  ce_mark?: string;
  note?: string;
};

export type QuickTestGroup = {
  name: string;
  items: QuickTestItem[];
};

export type QuickTest = {
  slug: string;
  title: string;
  summary: string;
  companies: { slug: string }[];
  subcategories: { slug: string }[];
  featured: boolean;
  visible: boolean;
  hero_image: string;
  gallery: { image: string }[];

  technology?: string; // PCR, lateral flow, ELISA, …

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

  groups?: QuickTestGroup[];

  table_note?: string;

  specs?: { name: string; value: string; unit?: string }[];

  tags?: string[];

  price?: string;

  assets?: {
    datasheet?: string;
    ifu?: string; // Instructions For Use — required field for IVD kits
    external_url?: string;
    eshop_url?: string;
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
        visible: data.visible !== false,
        hero_image: data.hero_image || "",
        gallery: (data.gallery || []).map((item: string | { image: string }) =>
          typeof item === "string" ? { image: item } : item,
        ),
        technology: data.technology || undefined,
        features: data.features || [],
        target_groups: data.target_groups || [],
        groups: data.groups || [],
        table_note: data.table_note || "",
        specs: data.specs || [],
        tags: data.tags || [],
        price: data.price || undefined,
        assets: data.assets || {},
        seo: data.seo || {},
        body: content,
      };
    })
    .filter((qt) => qt.visible)
    .sort((a, b) => a.title.localeCompare(b.title));
}
