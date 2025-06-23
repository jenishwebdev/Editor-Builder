import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

const baseStyles =
  "px-3 py-2 rounded transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
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

export default Button;
