import React from "react";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "danger";
}

const baseStyles =
  "p-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";

const variants = {
  default: "hover:bg-gray-200 focus:ring-blue-500",
  danger: "hover:bg-red-600 focus:ring-red-500 text-white",
};

const IconButton: React.FC<IconButtonProps> = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => (
  <button
    className={`${baseStyles} ${variants[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default IconButton;
