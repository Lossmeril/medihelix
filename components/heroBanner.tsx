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

        <div className="relative isolate px-6 pt-16 lg:px-20 w-full md:w-1/2 lg:w-2/3 text-left z-40">
          <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
            <div className="flex items-center gap-1 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/logo.svg"
                className="h-6 w-auto object-cover"
                alt=""
              />
              <span className="sr-only">MEDI HELIX s.r.o.,</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-balance uppercase font-heading text-dark">
              {headline}
            </h1>
            <Divider />

            <p className="mt-8 text-lg font-normal text-pretty text-dark/80 sm:text-xl/8">
              {subheadline}
            </p>

            <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-start gap-6">
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
        </div>
      </div>

      <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden -z-10">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
          width={1920}
          height={1080}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video/ANTIKOR hero video.webm" type="video/webm" />
          <source src="/video/ANTIKOR hero video.mp4" type="video/mp4" />
        </video>

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
