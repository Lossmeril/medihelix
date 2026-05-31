"use client";

import Link from "next/link";

import { Subcategory } from "@/utils/getSubcategory";

type Crumb = {
  href: string;
  label: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
  current: string;
  className?: string;
};

export const BreadcrumbsBlock = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <nav aria-label="Breadcrumb" className="mb-10 flex flex-col gap-3">
    {children}
  </nav>
);

const Breadcrumbs = ({ items, current, className }: BreadcrumbsProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <div className="flex items-center text-sm text-gray-500">
        {items.map((item, i) => (
          <span key={i} className="flex items-center">
            <Link href={item.href} className="hover:underline text-sky-600">
              {item.label}
            </Link>
            <span className="mx-2">/</span>
          </span>
        ))}
        <span className="font-semibold text-gray-800">{current}</span>
      </div>
    </div>
  );
};

interface CompanyBreadcrumbsProps {
  company: { name: string; slug: string };
  product?: { title: string };
}

export const CompanyBreadcrumbs = ({
  company,
  product,
}: CompanyBreadcrumbsProps) => {
  const items = [{ href: "/companies", label: "Výrobci" }];

  if (product) {
    items.push({
      href: `/companies/${company.slug}`,
      label: company.name,
    });
  }

  return (
    <Breadcrumbs
      items={[...items]}
      current={product ? product.title : company.name}
    />
  );
};

const productTypeConfig = {
  Instrument: { href: "/instruments", label: "Přístroje" },
  Kit: { href: "/quick-tests", label: "Rychlotesty" },
  Consumable: { href: "/consumables", label: "Reagencie a spotřební materiál" },
};

interface ProductBreadcrumbsProps {
  subcategories?: Subcategory[];
  product?: { title: string; slug: string };
  type?: keyof typeof productTypeConfig;
}

export const ProductBreadcrumbs: React.FC<ProductBreadcrumbsProps> = ({
  product,
  subcategories,
  type = "Instrument",
}) => {
  const { href: baseHref, label: baseLabel } = productTypeConfig[type];

  if (!subcategories) {
    return (
      <Breadcrumbs
        items={[]}
        current={product ? product.title : baseLabel}
      />
    );
  }

  const subcategoryTrail = subcategories.map((subcategory: Subcategory) => ({
    href: `${baseHref}/${subcategory.slug}`,
    label: subcategory.name,
  }));

  const items = [{ href: baseHref, label: baseLabel }, ...subcategoryTrail];
  if (!product) {
    items.splice(-1, 1);
  }

  return (
    <Breadcrumbs
      items={items}
      current={
        product
          ? product.title
          : subcategoryTrail[subcategoryTrail.length - 1].label
      }
    />
  );
};
