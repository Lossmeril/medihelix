const SectionHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2
    className={`text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-semibold tracking-tight text-balance uppercase font-heading mb-8 ${className || ""}`}
  >
    {children}
  </h2>
);

export default SectionHeading;
