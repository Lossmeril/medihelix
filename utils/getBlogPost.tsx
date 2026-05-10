"use server";

import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  image: string;
  body: string;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  const dir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(dir);

  return files
    .filter((f) => f.endsWith(".md"))
    .map((filename): BlogPost => {
      const fileContent = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(fileContent);
      return {
        slug: filename.replace(/\.md$/, ""),
        title: data.title || "",
        date: data.date ? new Date(data.date).toISOString() : "",
        image: data.image || "",
        body: content,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
