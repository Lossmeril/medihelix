import Button from "./button";
import Divider from "./divider";

type HeroBannerProps = {
  headline: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

const HeroBanner = ({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
}: HeroBannerProps) => {
  return (
    <>
      <div className="relative bg-white/80 text-dark h-screen max-w-screen overflow-hidden">
        <div className="bg-sky-400/30 w-screen h-screen absolute top-0 left-0 hero-polygon"></div>
        <div className="bg-sky-500/50 w-screen h-screen absolute top-0 left-0 hero-polygon-2 z-20"></div>
        <div className="bg-white w-screen h-screen absolute top-0 left-0 hero-polygon-3 z-30"></div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 items-center max-w-350 mx-auto isolate px-6 pt-16 lg:px-20 w-full text-left z-40">
          <div className="mx-auto max-w-full py-32 sm:py-48 lg:pb-56">
            <div className="flex items-center gap-1 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/logo.svg"
                className="h-6 w-auto object-cover"
                alt=""
              />
              <span className="sr-only">MEDI HELIX s.r.o.,</span>
            </div>

            <h1 className="text-5xl md:mx-0 lg:text-6xl xl:text-7xl font-bold tracking-tighter text-balance font-heading text-dark">
              {headline}
            </h1>
            <Divider />

            <p className="mt-8 text-lg font-normal text-pretty text-dark/80 sm:text-lg">
              {subheadline}
            </p>

            <div className="mt-10 flex flex-col lg:flex-row items-start lg:items-center justify-start gap-6">
              <Button label={primaryCta.label} href={primaryCta.href} />
              <Button
                label={secondaryCta.label}
                href={secondaryCta.href}
                transparent
                monochrome
                inverted
              />
            </div>
          </div>
          <div className="w-full aspect-square z-0 mask-y-from-80% mask-y-to-100% relative mix-blend-multiply -translate-y-30 md:-translate-y-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/medi007.png"
              className="w-full h-full object-cover absolute top-0 left-0 bg-blend-multiply"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/stock/stock-5.jpg"
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt=""
        />
      </div>
    </>
  );
};

export default HeroBanner;
