import { landingContent } from "@/data/pageContent/homepage";

import ContactForm from "@/components/contactForm";
import HeroBanner from "@/components/heroBanner";
import CTASection from "@/components/sections/homepage/ctaSection";
import WhatWeDoSection from "@/components/sections/homepage/whatWeDoSection";
import WhoWeAreSection from "@/components/sections/homepage/whoWeAreSection";
import WhyUsSection from "@/components/sections/homepage/whyUsSection";

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
      />

      <WhatWeDoSection
        title={sections.whatWeDo.title}
        paragraphs={sections.whatWeDo.paragraphs}
        bullets={sections.whatWeDo.bullets}
      />

      <WhyUsSection
        title={sections.whyUs.title}
        lead={sections.whyUs.lead}
        promise={sections.whyUs.promise}
        uspPoints={sections.whyUs.uspPoints}
      />

      <CTASection
        title={sections.cta.title}
        text={sections.cta.text}
        button={sections.cta.button}
      />

      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-4 py-12">
        <ContactForm />
      </div>

      {/*
        Decap-driven sekce DOČASNĚ SCHOVÁNY:
        - Přístroje (getInstruments + ProductCard)
        - Naši dodavatelé (getCompanies)
        Až bude CMS připravené, vrátíme je sem jako samostatné sekce:
        <FeaturedInstrumentsSection />
        <PartnersSection />
      */}
    </main>
  );
};

export default HomePage;
