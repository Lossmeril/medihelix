interface DividerProps {
  color?: string;
  marginTop?: number | string;
  marginBottom?: number | string;
}

const Divider: React.FC<DividerProps> = ({
  color = "dark",
  marginTop = "2rem",
  marginBottom = "2rem",
}) => {
  return (
    <span
      className="w-full h-px opacity-35 block"
      style={{ backgroundColor: `var(--${color})`, marginTop, marginBottom }}
    />
  );
};

export default Divider;
