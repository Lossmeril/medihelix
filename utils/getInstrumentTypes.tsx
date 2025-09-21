"use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type InstrumentType = {
  slug: string;
  name: string;
  description?: string;
  body: string;
};

export async function getInstrumentTypes(): Promise<InstrumentType[]> {
  const dir = path.join(process.cwd(), "content/instrument_types");
  const files = fs.readdirSync(dir);

  return files
    .map((filename): InstrumentType => {
      const fileContent = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(fileContent);
      return {
        slug: data.slug || filename.replace(/\.md$/, ""),
        name: data.name || "",
        description: data.description || "",
        body: content,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
