import { landingContent } from "@/data/pageContent/homepage";

import ContactForm from "@/components/contactForm";
import HeroBanner from "@/components/heroBanner";
import BlogSection from "@/components/sections/homepage/blogSection";
import CTASection from "@/components/sections/homepage/ctaSection";
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
      <FeaturedProductsSection />
      <BlogSection />
      <PartnersSection />
      <CTASection
        title={sections.cta.title}
        text={sections.cta.text}
        button={sections.cta.button}
      />
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-0 py-12">
        <ContactForm />
      </div>
    </main>
  );
};

export default HomePage;
