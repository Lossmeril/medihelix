"use server";

import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type Subcategory = {
  slug: string;
  name: string;
  description?: string;
  parent?: string;
  body: string;
};

export async function getSubcategories(): Promise<Subcategory[]> {
  const dir = path.join(process.cwd(), "content/subcategories");
  const files = fs.readdirSync(dir);

  return files
    .map((filename): Subcategory => {
      const fileContent = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(fileContent);
      return {
        slug: data.slug || filename.replace(/\.md$/, ""),
        name: data.name || "",
        description: data.description || "",
        parent: data.parent || undefined,
        body: content,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
