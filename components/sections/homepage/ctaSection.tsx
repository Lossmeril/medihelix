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
      <Card theme="dark" className="shadow-sm">
        <div className="p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold uppercase font-heading">
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
        </div>
      </Card>
    </Section>
  );
}
