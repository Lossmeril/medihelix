interface SectionProps {
  anchor?: string;
  theme?: "dark" | "light";
  children: React.ReactNode;
  minHeight?: "screen" | "content";
}

const Section: React.FC<SectionProps> = ({
  anchor,
  theme = "light",
  minHeight = "content",
  children,
}) => {
  return (
    <section
      id={anchor ?? ""}
      className={`w-full relative overflow-hidden flex flex-col items-center justify-center
        px-6 sm:px-10 lg:px-20 xl:px-40 py-16 sm:py-20
        ${minHeight === "screen" ? "min-h-screen" : ""}
        ${theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"}`}
    >
      <div className="w-full max-w-6xl">{children}</div>
    </section>
  );
};

export default Section;
