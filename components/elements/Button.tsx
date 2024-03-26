import { useState } from "react";

import Loading from "../Loading";

type ButtonProps = {
  label: string;
  hoverLabel?: string;
  isWidthFull?: boolean;
  textSize?: string;
  bgColor: "blue" | "black" | "white" | "red";
  hoverColor?: "red";
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
};

const Button = ({ label, hoverLabel, isWidthFull, textSize, bgColor, hoverColor, disabled, loading, onClick }: ButtonProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={`flex justify-center items-center gap-2 ${isWidthFull && "w-full"} px-4 ${isWidthFull ? "py-4" : "py-2"} rounded-full ${textSize} ${bgColor === "blue" && "bg-sky-500"} ${bgColor === "black" && "border border-gray-600"} ${bgColor === "white" && "bg-white text-black"} ${bgColor === "red" && "bg-red-500"} ${hoverColor === "red" && "hover:text-red-500 hover:border-red-500"} ${(disabled || loading) && "opacity-50"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {loading && <Loading loading={loading} size="small" />}
      {(isHovered && hoverLabel) ? hoverLabel : label}
    </button>
  );
};

export default Button;
