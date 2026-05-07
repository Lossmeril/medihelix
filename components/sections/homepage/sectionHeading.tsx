const SectionHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2
    className={`text-4xl sm:text-3xl lg:text-4xl xl:text-6xl tracking-tight text-balance font-heading font-black mb-8 ${className || ""}`}
  >
    {children}
  </h2>
);

export default SectionHeading;
