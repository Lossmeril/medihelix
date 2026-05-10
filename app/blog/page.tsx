import { getBlogPosts } from "@/utils/getBlogPost";

import ArticleCard from "@/components/articleCard";
import Section from "@/components/section";
import SubpageHero from "@/components/subpageHero";

const BlogPage = async () => {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen items-center justify-center">
      <SubpageHero badgeText="Aktuality" title={"Aktuality"} description={"Buďte v obraze ohledně nejnovějších událostí a firemních novinek."} 
       />
      <Section anchor="blog" minHeight="content" wide>
        {/* <h1 className="text-4xl font-bold">Blog</h1> */}
        <div className="max-w-350 mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default BlogPage;
