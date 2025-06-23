import React from "react";
import { Type, Image, Layers } from "lucide-react";
import { DragData } from "../types";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  const handleDragStart = (e: React.DragEvent, type: "text" | "image") => {
    const dragData: DragData = { type, isNewComponent: true };
    e.dataTransfer.setData("application/json", JSON.stringify(dragData));
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div
      className={`w-64 bg-white border-r border-gray-200 flex flex-col ${className}`}
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center mb-2">
          <Layers className="w-6 h-6 text-blue-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-900">Editor Builder</h1>
        </div>
        <p className="text-sm text-gray-600">
          Drag components to build your page
        </p>
      </div>

      <div className="p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
          Components
        </h2>
        <div className="space-y-3">
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, "text")}
            className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200 cursor-grab hover:bg-blue-100 transition-all duration-200 active:cursor-grabbing hover:shadow-md"
          >
            <Type className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <div className="font-medium text-gray-900">Text</div>
              <div className="text-xs text-gray-600">
                Rich text with markdown
              </div>
            </div>
          </div>

          <div
            draggable
            onDragStart={(e) => handleDragStart(e, "image")}
            className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200 cursor-grab hover:bg-green-100 transition-all duration-200 active:cursor-grabbing hover:shadow-md"
          >
            <Image className="w-5 h-5 text-green-600 mr-3" />
            <div>
              <div className="font-medium text-gray-900">Image</div>
              <div className="text-xs text-gray-600">Image from URL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
