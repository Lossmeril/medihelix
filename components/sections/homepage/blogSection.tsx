import Link from "next/link";

import { Calendar } from "lucide-react";


import { getBlogPosts } from "@/utils/getBlogPost";

import { webButtonArrow } from "@/data/webGlobals";

import Badge from "@/components/badge";
import Button from "@/components/button";
import Card from "@/components/card";
import Section from "@/components/section";

import SectionHeading from "./sectionHeading";
import ArticleCard from "@/components/articleCard";



const BlogSection = async () => {
  const blogPosts = await getBlogPosts().then((posts) => posts.slice(0, 4)); // Get only the latest 4 posts

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
          <ArticleCard post={post} key={post.slug} />
        ))}
      </div>
    </Section>
  );
};

export default BlogSection;
