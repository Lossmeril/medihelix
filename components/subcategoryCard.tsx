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
      <div className="grid grid-cols-2 h-20 justify-center items-center bg-sky-100 hover:bg-sky-200 transition-colors rounded-lg border border-sky-800/5 pr-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          className="h-20 aspect-square object-cover rounded-l-md"
        />
        <div className="pl-2">{name}</div>
      </div>
    </Link>
  );
};

export default SubcategoryCard;
