import Button from "@/components/button";
import Card from "@/components/card";
import Section from "@/components/section";

export default function CTASection({
  title,
  text,
  button,
}: {
  title: string;
  text: string;
  button: { label: string; href: string };
}) {
  return (
    <Section anchor="sluzby" minHeight="content" theme="light">
      <Card theme="dark" tip className="shadow-sm">
        <div className="p-8 sm:p-10 px-20 my-20 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-5xl font-bold leading-none font-heading mb-4">
            {title}
          </h2>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">{text}</p>
          <div className="mt-8 flex justify-center">
            <Button
              label={button.label}
              href={button.href}
              inverted
              monochrome
            />
          </div>
          <div
            className="absolute inset-0 -z-10 mix-blend-screen grayscale hover:scale-3d transition opacity-55 mask-l-from-0% to-100%"
            style={{
              background:
                "url(./img/stock/stock-6.jpg) center/cover no-repeat ",
            }}
          />
        </div>
      </Card>
    </Section>
  );
}
