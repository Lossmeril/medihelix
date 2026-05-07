import Link from "next/link";

import { Calendar } from "lucide-react";
import { marked } from "marked";

import { getBlogPosts } from "@/utils/getBlogPost";

import { webButtonArrow } from "@/data/webGlobals";

import Badge from "@/components/badge";
import Button from "@/components/button";
import Card from "@/components/card";
import Section from "@/components/section";

import SectionHeading from "./sectionHeading";

const EXCERPT_LENGTH = 160;

function getExcerpt(markdown: string): string {
  const firstParagraph = markdown.split(/\n\n+/)[0].trim();
  const truncated =
    firstParagraph.length > EXCERPT_LENGTH
      ? firstParagraph.slice(0, EXCERPT_LENGTH).trimEnd() + "…"
      : firstParagraph;
  return marked(truncated) as string;
}

const BlogSection = async () => {
  const blogPosts = await getBlogPosts();

  return (
    <Section anchor="blog" minHeight="content" wide>
      <div className="w-full h-full absolute left-0 top-0 bg-linear-180 from-transparent to-sky/10 pointer-events-none"></div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 items-end mb-8">
        <div className="col-span-3">
          <div className="w-full text-left mb-3">
            <Badge>Aktuality</Badge>
          </div>
          <SectionHeading className="text-left" marginBottom="mb-4 lg:mb-0">
            Buďte v obraze
          </SectionHeading>
        </div>
        <div className="col-span-1">
          <Button
            label={"Všechny aktuality"}
            href="/blog"
            transparent
            inverted
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {blogPosts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="w-full group"
          >
            <Card className="shadow-md" key={post.slug}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image || "/img/medi007.png"}
                alt={post.title}
                className="w-full h-50 object-cover object-top bg-sky/10 border-b border-dark/10"
              />
              <div className="pb-8 px-4 flex flex-col gap-2 relative">
                <div className="w-fit mb-1">
                  <div className="text-xs font-semibold text-sky bg-sky/10 px-2 py-0.5 rounded-3xl flex flex-row flex-nowrap items-center gap-2">
                    <Calendar size={12} />
                    {new Date(post.date).toLocaleDateString("cs-CZ", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <div className="h-12 line-clamp-2">
                  <h3 className="text-lg font-bold tracking-tight leading-tight mb-1">
                    {post.title}
                  </h3>
                </div>
                {/* {company && company.slug && company.name && (
                <Link href={`/companies/${company?.slug}`}>
                  <h4 className="text-sm text-sky italic mb-3">
                    {company?.name}
                  </h4>
                </Link>
              )} */}
                <div
                  className="text-sm text-gray-500 leading-tight flex-1 [&>p]:mb-2"
                  dangerouslySetInnerHTML={{ __html: getExcerpt(post.body) }}
                />

                <p className="text-sm font-bold text-sky group-hover:text-black transition-colors">
                  Číst dále {webButtonArrow}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
};

export default BlogSection;
