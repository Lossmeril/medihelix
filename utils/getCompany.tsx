"use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Company = {
  slug: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  body: string;
};

export async function getCompanies(): Promise<Company[]> {
  const dir = path.join(process.cwd(), "content/companies");
  const files = fs.readdirSync(dir);

  return files
    .map((filename): Company => {
      const fileContent = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(fileContent);
      return {
        slug: data.slug || filename.replace(/\.md$/, ""),
        name: data.name || "",
        logo: data.logo || "",
        website: data.website || "",
        description: data.description || "",
        body: content,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
