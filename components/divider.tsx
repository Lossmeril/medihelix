interface DividerProps {
  color?: "dark" | "light" | "steel";
  marginTop?: number | string;
  marginBottom?: number | string;
}

const Divider: React.FC<DividerProps> = ({
  color = "steel",
  marginTop = "2rem",
  marginBottom = "2rem",
}) => {
  return (
    <div
      className="w-20 h-3"
      style={{
        backgroundColor: `var(--${color})`,
        marginTop,
        marginBottom,
      }}
    ></div>
  );
};

export default Divider;
