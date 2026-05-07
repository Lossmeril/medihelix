interface SectionProps {
  anchor?: string;
  theme?: "dark" | "light";
  children: React.ReactNode;
  minHeight?: "screen" | "content";
  borderTop?: boolean;
  borderBottom?: boolean;
  bgColor?: string;
}

const Section: React.FC<SectionProps> = ({
  anchor,
  theme = "light",
  minHeight = "content",
  borderTop = false,
  borderBottom = false,
  bgColor,
  children,
}) => {
  return (
    <section
      id={anchor ?? ""}
      className={`w-full relative overflow-hidden flex flex-col items-center justify-center
        px-6 sm:px-10 lg:px-20 xl:px-40 py-16 sm:py-20
        ${minHeight === "screen" ? "min-h-screen" : ""}
        ${theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"}`}
      style={{
        borderTop: borderTop ? "1px solid rgba(0, 0, 0, 0.1)" : undefined,
        borderBottom: borderBottom ? "1px solid rgba(0, 0, 0, 0.1)" : undefined,
        backgroundColor: bgColor || undefined,
      }}
    >
      <div className="w-full max-w-6xl">{children}</div>
    </section>
  );
};

export default Section;
