import Link from "next/link";

interface SubcategoryCardProps {
  href: string;
  name: string;
  image: string;
}

const SubcategoryCard: React.FC<SubcategoryCardProps> = ({
  href,
  name,
  image,
}) => {
  return (
    <Link href={href}>
      <div className="overflow-hidden flex flex-row gap-5 pr-5 h-20 justify-center items-center bg-sky-100 hover:bg-sky-200 transition-colors rounded-lg border border-sky-800/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          className="h-20 aspect-square object-cover rounded-l-md"
        />
        <div className="">{name}</div>
      </div>
    </Link>
  );
};

export default SubcategoryCard;
