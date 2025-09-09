interface CardProps {
  tip?: boolean;
  theme?: "light" | "dark" | "sky";
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ tip, theme = "light", children }) => {
  return (
    <div className={`card min-h-[200px] h-full ${"card-" + theme}`}>
      <div
        className={`card-content ${
          tip ? "card-tip" : ""
        } min-h-[200px] h-full relative`}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
