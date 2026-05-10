import { landingContent } from "@/data/pageContent/homepage";

import HeroBanner from "@/components/heroBanner";
import BlogSection from "@/components/sections/homepage/blogSection";
import FeaturedProductsSection from "@/components/sections/homepage/featuredProductsSection";
import PartnersSection from "@/components/sections/homepage/partnersSection";
import WhatWeDoSection from "@/components/sections/homepage/whatWeDoSection";
import WhoWeAreSection from "@/components/sections/homepage/whoWeAreSection";

const HomePage = async () => {
  const { hero, sections } = landingContent;

  return (
    <main>
      <HeroBanner
        headline={hero.headline}
        subheadline={hero.subheadline}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
      />
      <WhoWeAreSection
        title={sections.whoWeAre.title}
        paragraphs={sections.whoWeAre.paragraphs}
        uspPoints={sections.whoWeAre.uspPoints}
        promise={sections.whoWeAre.promise}
      />
      <WhatWeDoSection
        title={sections.whatWeDo.title}
        paragraphs={sections.whatWeDo.paragraphs}
        bullets={sections.whatWeDo.bullets}
      />
      {/* <FeaturedProductsSection /> */}
      <BlogSection />
      {/* <PartnersSection /> */}
    </main>
  );
};

export default HomePage;
