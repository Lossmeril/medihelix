"use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Instrument = {
  slug: string;
  title: string;
  summary: string;
  companies: { slug: string }[];
  instrument_types: { slug: string }[];
  hero_image: string;
  gallery: { image: string }[];
  features?: { title: string; description?: string }[];
  specs?: { name: string; value: string; unit?: string; group?: string }[];
  test_groups?: {
    name: string;
    tests: {
      name: string;
      targets?: string;
      code?: string;
      note?: string;
    }[];
  }[];
  intended_use: { place: string }[];
  sku: string;
  tags?: string[];
  assets?: {
    datasheet?: string;
    external_url?: string;
  };
  seo?: {
    meta_title?: string;
    meta_description?: string;
  };
  body: string;
};

export async function getInstruments(): Promise<Instrument[]> {
  const dir = path.join(process.cwd(), "content/instruments");
  const files = fs.readdirSync(dir);

  return files
    .map((filename): Instrument => {
      const fileContent = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(fileContent);
      return {
        slug: data.slug || filename.replace(/\.md$/, ""),
        title: data.title || "",
        summary: data.summary || "",
        companies: data.companies || [],
        instrument_types: data.instrument_types || [],
        hero_image: data.hero_image || "",
        gallery: data.gallery || [],
        features: data.features || [],
        specs: data.specs || [],
        test_groups: data.test_groups || [],
        intended_use: data.intended_use || [],
        sku: data.sku || "",
        tags: data.tags || [],
        assets: data.assets || {},
        seo: data.seo || {},
        body: content,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}
