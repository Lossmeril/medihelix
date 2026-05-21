import Link from "next/link";

import { Company } from "@/utils/getCompany";
import { Subcategory } from "@/utils/getSubcategory";

import Button from "./button";
import Divider from "./divider";

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
      <div
        className={`card-content ${tip ? "card-tip" : ""} h-full relative flex flex-col`}
      >
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
  subcategories: { slug: string }[];
  basePath?: string;

  company?: Company;
  categories?: Subcategory[];

  price?: string;
  eshop_url?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  summary,
  hero_image,
  slug,
  subcategories,
  basePath = "/instruments",
  company,
  categories,
  price,
  eshop_url,
}) => {
  return (
    <Card className="shadow-md product-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hero_image || "/img/placeholders/instrument-placeholder.png"}
        alt={title}
        className="w-full h-40 object-cover bg-white border-b border-dark/10"
      />
      <div className="pb-8 px-4 flex flex-col flex-1">
        {categories && categories.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <span
                key={category.slug}
                className="flex items-center text-xs text-gray-500 gap-2"
              >
                <Link
                  key={category.slug}
                  href={`/instruments/${category.slug}`}
                  className=" text-gray-500 hover:text-gray-700"
                >
                  {category.name}
                </Link>
                {index < categories.length - 1 && <span>|</span>}
              </span>
            ))}
          </div>
        )}
        <h3 className="text-lg font-semibold leading-tight mb-1">{title}</h3>
        {company && company.slug && company.name && (
          <Link href={`/companies/${company?.slug}`}>
            <h4 className="text-sm text-sky italic mb-3">{company?.name}</h4>
          </Link>
        )}
        <p className="text-sm text-gray-500 leading-tight flex-1 text-balance">
     {summary}
        </p>

        {price && (
          <p className="mt-3 text-base font-bold text-sky-700">{price}</p>
        )}

        <Divider marginTop="1rem" marginBottom="1rem" />
        <div className="flex flex-col gap-3">
          {eshop_url && (
            <Button label="Koupit v e-shopu" href={eshop_url} />
          )}
          <Button
            label="Prohlédnout si detaily"
            href={`${basePath}/${
              subcategories[0]?.slug ? subcategories[0].slug + "/" : ""
            }${slug}`}
            transparent={!!eshop_url}
            inverted={!!eshop_url}
            monochrome={!!eshop_url}
          />
        </div>
      </div>
    </Card>
  );
};
