interface SectionProps {
  anchor?: string;
  theme?: "dark" | "light";
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  anchor,
  theme = "dark",
  children,
}) => {
  return (
    <section
      id={anchor ?? ""}
      className={`w-screen min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-20 xl:px-40 py-20 
        ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}
    >
      {children}
    </section>
  );
};

export default Section;
