import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  color?: "blue" | "red" | "green" | "gray";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  color,
  size = "md",
  disabled = false,
}) => {
  const colorClasses: { [key: string]: string } = {
    blue: "bg-blue-500 hover:bg-blue-700 dark:bg-blue-400",
    red: "bg-red-500 hover:bg-red-700 dark:bg-red-400",
    green: "bg-green-500 hover:bg-green-700 dark:bg-green-400",
    gray: "bg-gray-500 hover:bg-gray-700 dark:bg-gray-400",
  };

  const sizeClasses: { [key: string]: string } = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-bold rounded-lg w-full transition-all cursor-pointer duration-200 whitespace-nowrap ease-in-out 
        ${color ? colorClasses[color] : "bg-[#ffde59] hover:bg-yellow-400 dark:bg-indigo-600 dark:hover:bg-indigo-500"} 
        ${sizeClasses[size]} 
        ${disabled ? "opacity-50 cursor-not-allowed" : "text-white"}
      `}
    >
      {label}
    </button>
  );
};

export default CustomButton;
