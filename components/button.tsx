import { webButtonArrow } from "@/data/webGlobals";
import Link from "next/link";
import React from "react";

interface ButtonProps {
  label: string;
  href?: string;

  transparent?: boolean;
  inverted?: boolean;
  monochrome?: boolean;

  onClick?: () => void;
}

const ButtonInside = ({
  label,
  transparent,
  inverted,
  monochrome,
}: {
  label: string;
  transparent?: boolean;
  inverted?: boolean;
  monochrome?: boolean;
}) => {
  return (
    <div
      className={`rounded-md text-md font-semibold shadow-xs transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel ${
        !transparent
          ? !inverted
            ? !monochrome
              ? "bg-steel text-light hover:bg-steel-700 px-3.5 py-2.5 "
              : "bg-dark text-light hover:bg-dark/70 px-3.5 py-2.5 "
            : !monochrome
            ? "bg-light text-steel hover:light/90 px-3.5 py-2.5 "
            : "bg-light text-dark hover:bg-light/90 px-3.5 py-2.5 "
          : !inverted
          ? !monochrome
            ? "bg-transparent text-steel hover:text-light px-0"
            : "bg-transparent text-light hover:text-light/60 px-0"
          : !monochrome
          ? "bg-transparent text-steel hover:text-dark px-0"
          : "bg-transparent text-dark hover:text-dark/60 px-0"
      } `}
    >
      {label + " " + webButtonArrow}
    </div>
  );
};

const Button: React.FC<ButtonProps> = ({
  label,
  href,
  transparent,
  inverted,
  monochrome,
  onClick,
}) => {
  return (
    <>
      {href ? (
        <Link href={href} onClick={onClick}>
          <ButtonInside
            label={label}
            transparent={transparent}
            inverted={inverted}
            monochrome={monochrome}
          />
        </Link>
      ) : onClick ? (
        <button onClick={onClick}>
          <ButtonInside
            label={label}
            transparent={transparent}
            inverted={inverted}
            monochrome={monochrome}
          />
        </button>
      ) : (
        <ButtonInside
          label={label}
          transparent={transparent}
          inverted={inverted}
          monochrome={monochrome}
        />
      )}
    </>
  );
};

export default Button;
