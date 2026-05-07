interface BadgeProps {
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ children }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs tracking-wider font-semibold uppercase bg-sky/10 text-sky">
      {children}
    </div>
  );
};

export default Badge;
