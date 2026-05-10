const SectionHeading = ({
  children,
  className,
  marginBottom = "mb-8",
}: {
  children: React.ReactNode;
  className?: string;
  marginBottom?: string;
}) => (
  <h2
    className={`text-4xl sm:text-3xl lg:text-4xl xl:text-6xl tracking-tight text-balance font-heading font-black ${marginBottom} ${className || ""}`}
  >
    {children}
  </h2>
);

export default SectionHeading;
