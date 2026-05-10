import Badge from "./badge";
import Button from "./button";

interface SubpageHeroProps {
  badgeText: string;
  title: string;
  description: string;
  cta1?: {
    text: string;
    href: string;
  };
  cta2?: {
    text: string;
    href: string;
  };
  imageSrc?: string;
}

const SubpageHero: React.FC<SubpageHeroProps> = ({
  title,
  description,
  cta1,
  cta2,
  badgeText,
  imageSrc,
}) => {
  return (
    <div className="bg-sky/10 py-16 h-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc || "/img/stock/stock-1.jpg"}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-center opacity-20 pointer-events-none select-none mask-l-from-0% to-50%"
      />
      <div className="max-w-350 mx-auto pt-20 px-6 sm:px-10 lg:px-0">
        {badgeText && (
          <div className="mb-3">
            <Badge>{badgeText}</Badge>
          </div>
        )}
        <h1 className="text-4xl font-black mb-4">{title}</h1>
        <p className="text-lg text-gray-700 mb-8">{description}</p>
        <div className="flex justify-start gap-4">
          {cta1 && <Button href={cta1.href} label={cta1.text} />}
          {cta2 && <Button href={cta2.href} label={cta2.text} />}
        </div>
      </div>
    </div>
  );
};

export default SubpageHero;
