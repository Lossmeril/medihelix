import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Card from "@/components/card";
import Link from "next/link";

export async function generateStaticParams() {
  const files = fs.readdirSync("content/blog");
  return files.map((filename) => ({
    slug: filename.replace(/\.md$/, ""),
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), "content/blog", `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return (
    <main className="max-w-screen overflow-x-hidden pt-20 border-b mb-12 border-[#E5E7EB]">
      <section className="max-w-4xl mx-auto px-[5%] pt-20 pb-32 overflow-x-hidden flex flex-col items-start rounded-xl">
        <Link
          href="/blog"
          className="text-sky text-base mt-12 mb-6 hover:underline"
        >
          ← Zpět na blog
        </Link>

        {data.image.trim() !== "" && (
          <Card className="w-full h-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.image}
              alt={data.title ?? ""}
              className="w-full h-full object-cover"
            />
          </Card>
        )}

        <h1 className="text-black text-left text-4xl font-black mt-12">
          {data.title}
        </h1>

        {data.date && (
          <p className="text-sm font-bold text-sky-500 my-8 text-left w-full">
            {new Date(data.date).toLocaleDateString("cs-CZ")}
          </p>
        )}

        <article className="prose prose-lg max-w-none w-full text-left text-balance text-black/60 prose-strong:text-black/80 prose-headings:text-sky prose-a:text-sky prose-a:underline">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </section>
    </main>
  );
}