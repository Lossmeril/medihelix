import Balancer from "react-wrap-balancer";
import Divider from "./divider";
import Button from "./button";

interface CardProps {
  tip?: boolean;
  theme?: "light" | "dark" | "sky";
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  tip,
  theme = "light",
  children,
  className,
}) => {
  return (
    <div className={`card h-full ${"card-" + theme} ${className || ""}`}>
      <div className={`card-content ${tip ? "card-tip" : ""}  h-full relative`}>
        {children}
      </div>
    </div>
  );
};

export default Card;

interface ProductCardProps {
  title: string;
  summary: string;
  hero_image: string;
  slug: string;
  instrument_types: { slug: string }[];
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  summary,
  hero_image,
  slug,
  instrument_types,
}) => {
  return (
    <Card className="shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hero_image}
        alt={title}
        className="w-full h-40 object-contain bg-white border-b border-dark/10"
      />
      <div className="pb-8 px-4">
        <h3 className="text-lg font-semibold leading-tight mb-3">{title}</h3>
        <p className="text-sm text-gray-400 leading-tight">
          <Balancer>{summary}</Balancer>
        </p>
        <Divider marginTop="1rem" marginBottom="1rem" />
        <Button
          label="Prohlédnout si detaily"
          href={`/instruments/${
            instrument_types[0].slug ? instrument_types[0].slug + "/" : ""
          }${slug}`}
          transparent
          inverted
        />
      </div>
    </Card>
  );
};
