import React from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-lg shadow-2xl max-w-lg w-full mx-4 ${className}`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 rounded hover:bg-gray-100 focus:outline-none"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
