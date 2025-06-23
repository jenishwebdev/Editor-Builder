import React, { useState, useRef, useEffect } from "react";
import { X, Edit, Grip, ChevronLeft, ChevronRight } from "lucide-react";
import { ComponentWrapperProps } from "../types/component";
import TextComponent from "./TextComponent";
import ImageComponent from "./ImageComponent";

const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  component,
  onUpdate,
  onDelete,
  isPreviewMode,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const editRef = useRef<HTMLDivElement>(null);

  const handleResize = (direction: "shrink" | "grow") => {
    if (direction === "shrink" && component.gridSpan > 1) {
      onUpdate({ ...component, gridSpan: component.gridSpan - 1 });
    } else if (direction === "grow" && component.gridSpan < 12) {
      onUpdate({ ...component, gridSpan: component.gridSpan + 1 });
    }
  };

  const renderComponent = () => {
    switch (component.type) {
      case "text":
        return (
          <TextComponent
            component={component}
            onUpdate={onUpdate}
            isEditing={isEditing}
            isPreviewMode={isPreviewMode}
          />
        );
      case "image":
        return (
          <ImageComponent
            component={component}
            onUpdate={onUpdate}
            isEditing={isEditing}
            isPreviewMode={isPreviewMode}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  return (
    <div
      ref={editRef}
      className={`relative group transition-all duration-200 ${
        isPreviewMode ? "" : "min-h-[60px]"
      }`}
      style={{
        gridRow: component.gridRow + 1,
        gridColumn: `${component.gridColumn + 1} / span ${component.gridSpan}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Control Bar */}
      {!isPreviewMode && (isHovered || isEditing) && (
        <div className="absolute -top-10 left-0 right-0 flex items-center justify-between bg-gray-900 text-white px-3 py-1 rounded-t-lg shadow-lg z-10">
          <div className="flex items-center space-x-2">
            <Grip className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-medium capitalize">
              {component.type}
            </span>
            <span className="text-xs text-gray-400">
              {component.gridSpan}/12 columns
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleResize("shrink")}
              disabled={component.gridSpan <= 1}
              className="p-1 hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              title="Make narrower"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleResize("grow")}
              disabled={component.gridSpan >= 12}
              className="p-1 hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              title="Make wider"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`p-1 rounded ${
                isEditing ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
              title="Edit content"
            >
              <Edit className="w-4 h-4" />
            </button>

            <button
              onClick={() => onDelete(component.id)}
              className="p-1 hover:bg-red-600 rounded"
              title="Delete component"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Component Content */}
      <div
        className={`w-full h-full ${
          !isPreviewMode && (isHovered || isEditing)
            ? "ring-2 ring-blue-400 ring-opacity-50"
            : ""
        } ${isPreviewMode ? "" : "bg-white"} rounded-lg shadow-sm`}
      >
        {renderComponent()}
      </div>
    </div>
  );
};

export default ComponentWrapper;
