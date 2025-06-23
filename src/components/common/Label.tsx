import React from "react";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({
  children,
  className = "",
  ...props
}) => (
  <label
    className={`block text-xs font-medium text-gray-700 mb-1 ${className}`}
    {...props}
  >
    {children}
  </label>
);

export default Label;
