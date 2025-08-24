interface CardProps {
  tip?: boolean;
  theme?: "dark" | "steel";
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ tip, theme, children }) => {
  return (
    <div
      className={`card min-h-[200px] h-full ${
        theme == "steel" ? "card-steel" : "card-dark"
      }`}
    >
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
