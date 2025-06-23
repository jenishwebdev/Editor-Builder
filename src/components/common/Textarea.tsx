import React from "react";

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className = "",
  ...props
}) => (
  <textarea
    className={`w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200 ${className}`}
    {...props}
  />
);

export default Textarea;
