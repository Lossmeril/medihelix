import Button from "./button";
import Divider from "./divider";

const HeroBanner = () => {
  return (
    <>
      <div className="relative bg-dark/80 text-light h-screen max-w-screen overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/Manticore.svg"
          className="absolute -bottom-0 lg:bottom-20 xl:-bottom-20 -right-20 h-auto w-[500px] md:w-[600px] lg:w-[600px] xl:w-[850px] object-cover z-10 -scale-x-100"
          alt=""
        />
        <div className="bg-dark/80 w-screen h-screen absolute top-0 left-0 hero-polygon"></div>
        <div className="bg-steel-900 w-screen h-screen absolute top-0 left-0 hero-polygon-2 z-20"></div>
        <div className="bg-dark w-screen h-screen absolute top-0 left-0 hero-polygon-3 z-30"></div>

        <div className="relative isolate px-6 pt-16 lg:px-20 w-3/4 md:w-1/2 lg:w-2/3 text-left z-20">
          <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
            <div className="flex items-center gap-1 mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/logos/head-blue.svg"
                className="h-6 w-auto object-cover"
                alt=""
              />
              <p className="text-lg font-semibold text-steel uppercase tracking-widest">
                Medihelix
              </p>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-balance uppercase font-heading">
                Mantikoří síla v&nbsp;naší oceli
              </h1>
              <Divider />
              <p className="mt-8 text-lg font-normal text-pretty text-light/80 sm:text-xl/8">
                Poctivé řemeslo, moderní technologie: zakázková výroba
                nerezových a ocelových dílů
              </p>
              <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-center md:justify-start gap-6">
                <Button label="Začněme spolupracovat" href="/products" />
                <Button
                  label="Poznejte naše služby"
                  href="#služby"
                  transparent
                  monochrome
                />
              </div>
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
          src="/img/products/ANTIKOR hero thumb.png"
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt=""
        />
      </div>
    </>
  );
};

export default HeroBanner;
