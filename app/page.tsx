import Button from "@/components/button";
import Card from "@/components/card";
import Divider from "@/components/divider";
import HeroBanner from "@/components/heroBanner";
import Section from "@/components/section";
import { UspSection } from "@/components/usp";
import { uspPoints } from "@/data/uspPoints";
import Balancer from "react-wrap-balancer";

const HomePageInfoCardWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="w-full text-left p-12 pt-8 pr-20">{children}</div>;
};

const HomePage = () => {
  return (
    <>
      <HeroBanner />
      <Section>
        <div className="flex items-center gap-1 mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logos/head-blue.svg"
            className="h-6 w-auto object-cover"
            alt=""
          />
          <p className="text-lg font-semibold text-steel uppercase tracking-widest">
            Naše služby
          </p>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-balance uppercase font-heading text-center">
          Síla mýtu,
          <br />
          precziznost stroje
        </h2>
        <Divider />
        <div className="grid grid-cols-8 w-full gap-5 md:gap-10 mb-10">
          <div className="col-span-8 md:col-span-4">
            <Card>
              <div className="w-full h-40 bg-steel-700">
                {" "}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/products/cnc.jpg"
                  alt="CNC výroba"
                  className="w-full h-full object-cover mix-blend-luminosity opacity-50"
                />
              </div>
              <HomePageInfoCardWrapper>
                <p className="text-3xl font-bold">CNC výroba</p>
                <p className="my-4 text-md font-normal text-pretty text-light/80">
                  <Balancer>
                    <span className="text-steel-700">Mantikora</span> je bájná
                    bytost s lidskou tváří, tělem lva a štířím ocasem.
                    Představuje spojení síly a rozumu, stejně jako naše práce
                    spojuje robustní výkon s přesností a promyšleností při
                    obrábění oceli.
                  </Balancer>
                </p>

                <Button label="Dozvědět se více" href="#" transparent />
              </HomePageInfoCardWrapper>
            </Card>
          </div>
          <div className="col-span-8 md:col-span-4">
            <Card>
              <div className="w-full h-40 bg-steel-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/products/klempir.jpg"
                  alt="Klempířská výroba"
                  className="w-full h-full object-cover mix-blend-luminosity opacity-50"
                />
              </div>
              <HomePageInfoCardWrapper>
                <p className="text-3xl font-bold">Klempířská výroba</p>
                <p className="my-4 text-md font-normal text-pretty text-light/80">
                  <Balancer>
                    <span className="text-steel-700">Mantikora</span> je bájná
                    bytost s lidskou tváří, tělem lva a štířím ocasem.
                    Představuje spojení síly a rozumu, stejně jako naše práce
                    spojuje robustní výkon s přesností a promyšleností při
                    obrábění oceli.
                  </Balancer>
                </p>

                <Button label="Dozvědět se více" href="#" transparent />
              </HomePageInfoCardWrapper>
            </Card>
          </div>

          <div className="col-span-8 sm:col-span-5 md:col-span-6">
            <Card tip>
              <div className="w-full text-left p-[10%] pr-[22%] z-10">
                <p className="text-3xl font-bold">
                  Proč <span className="uppercase text-steel">mantikora</span>?
                </p>
                <p className="mt-4 text-md font-normal text-pretty text-light/80">
                  <Balancer>
                    <span className="text-steel-700">Mantikora</span> je bájná
                    bytost s lidskou tváří, tělem lva a štířím ocasem.
                    Představuje spojení síly a rozumu, stejně jako naše práce
                    spojuje při obrábění oceli robustní výkon se strojovou
                    přesností a lidským intelektem .
                  </Balancer>
                </p>
              </div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/manticore-drawing.jpg"
                className="absolute right-0 top-[50%] translate-y-[-40%] w-1/4 rotate-15 -scale-x-100 mix-blend-luminosity"
                alt="Mantikora"
              />
            </Card>
          </div>

          <div className="col-span-8 sm:col-span-3 md:col-span-2">
            <Card tip theme="steel">
              <div className="w-full text-left p-[10%] pr-20">
                <p className="lg:text-2xl xl:text-3xl font-bold">
                  Kontaktujte nás! <br />
                  <span className="text-6xl leading-6">&#8594;</span>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Section>
      <Section anchor="služby">
        <div className="flex items-center gap-1 mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logos/head-blue.svg"
            className="h-6 w-auto object-cover"
            alt=""
          />
          <p className="text-lg font-semibold text-steel uppercase tracking-widest">
            Proč do toho jít s&nbsp;ANTIKOREM?
          </p>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-balance uppercase font-heading text-center">
          Nejsme pouhou pohádkou
          <br />
        </h2>
        <Divider />
        <UspSection uspPoints={uspPoints} columnCount={4} />
      </Section>
    </>
  );
};

export default HomePage;
