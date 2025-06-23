import React from "react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({
  children,
  className = "",
  ...props
}) => (
  <select
    className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200 ${className}`}
    {...props}
  >
    {children}
  </select>
);

export default Select;
