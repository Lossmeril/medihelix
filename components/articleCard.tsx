import React from "react";

import Link from "next/link";

import { Calendar } from "lucide-react";
import { marked } from "marked";

import { BlogPost } from "@/utils/getBlogPost";

import { webButtonArrow } from "@/data/webGlobals";

import Card from "./card";

interface ArticleCardProps {
  post: BlogPost;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => {
  const EXCERPT_LENGTH = 160;

  function getExcerpt(markdown: string): string {
    const firstParagraph = markdown.split(/\n\n+/)[0].trim();
    const truncated =
      firstParagraph.length > EXCERPT_LENGTH
        ? firstParagraph.slice(0, EXCERPT_LENGTH).trimEnd() + "…"
        : firstParagraph;
    return marked(truncated) as string;
  }

  return (  
    <Link href={`/blog/${post.slug}`} className="w-full group">
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

                <div
                  className="text-sm text-gray-500 leading-tight flex-1 [&>p]:mb-2"
                  dangerouslySetInnerHTML={{ __html: getExcerpt(post.body) }}
                />

                <p className="text-sm font-bold text-sky group-hover:text-black transition-colors">
                  Číst dále {webButtonArrow}
                </p>
            </div>
            
        </Card>
    </Link>);
};

export default ArticleCard;
