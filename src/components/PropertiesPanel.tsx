import React from "react";
import { Settings, Type, Palette, Layout, X } from "lucide-react";
import { ComponentData } from "../types";

interface PropertiesPanelProps {
  selectedComponent: ComponentData | null;
  onUpdateComponent: (component: ComponentData) => void;
  onClose: () => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedComponent,
  onUpdateComponent,
  onClose,
}) => {
  if (!selectedComponent) return null;

  const handleStyleChange = (property: string, value: any) => {
    onUpdateComponent({
      ...selectedComponent,
      style: {
        ...selectedComponent.style,
        [property]: value,
      },
    });
  };

  const handleContentChange = (content: string) => {
    onUpdateComponent({
      ...selectedComponent,
      content,
    });
  };

  const handleGridChange = (property: string, value: number) => {
    onUpdateComponent({
      ...selectedComponent,
      [property]: Math.max(1, value),
    });
  };

  return (
    <div className="w-full bg-white border-l border-gray-200 flex flex-col h-full animate-in slide-in-from-right duration-300">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <div className="flex items-center">
          <Settings className="w-5 h-5 text-gray-600 mr-2" />
          <h2 className="font-semibold text-gray-900">Properties</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded transition-colors duration-200"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Component Info */}
        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center mb-2">
            {selectedComponent.type === "text" ? (
              <Type className="w-4 h-4 text-blue-600 mr-2" />
            ) : (
              <Palette className="w-4 h-4 text-green-600 mr-2" />
            )}
            <span className="font-medium capitalize">
              {selectedComponent.type} Component
            </span>
          </div>
          <div className="text-xs text-gray-500">
            ID: {selectedComponent.id}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-900 mb-3 flex items-center">
            <Type className="w-4 h-4 mr-2" />
            Content
          </h3>
          {selectedComponent.type === "text" ? (
            <textarea
              value={selectedComponent.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
              placeholder="Enter your text content..."
            />
          ) : (
            <input
              type="url"
              value={selectedComponent.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
              placeholder="https://example.com/image.jpg"
            />
          )}
        </div>

        {/* Typography (Text only) */}
        {selectedComponent.type === "text" && (
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <Type className="w-4 h-4 mr-2" />
              Typography
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Font Size
                </label>
                <select
                  value={selectedComponent.style.fontSize}
                  onChange={(e) =>
                    handleStyleChange("fontSize", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
                >
                  <option value="text-xs">Extra Small</option>
                  <option value="text-sm">Small</option>
                  <option value="text-base">Base</option>
                  <option value="text-lg">Large</option>
                  <option value="text-xl">Extra Large</option>
                  <option value="text-2xl">2X Large</option>
                  <option value="text-3xl">3X Large</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Font Weight
                </label>
                <select
                  value={selectedComponent.style.fontWeight}
                  onChange={(e) =>
                    handleStyleChange("fontWeight", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
                >
                  <option value="font-light">Light</option>
                  <option value="font-normal">Normal</option>
                  <option value="font-medium">Medium</option>
                  <option value="font-semibold">Semibold</option>
                  <option value="font-bold">Bold</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Text Align
                </label>
                <select
                  value={selectedComponent.style.textAlign}
                  onChange={(e) =>
                    handleStyleChange("textAlign", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Colors */}
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-900 mb-3 flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Colors
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Text Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={selectedComponent.style.color}
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedComponent.style.color}
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Background Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={selectedComponent.style.backgroundColor}
                  onChange={(e) =>
                    handleStyleChange("backgroundColor", e.target.value)
                  }
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedComponent.style.backgroundColor}
                  onChange={(e) =>
                    handleStyleChange("backgroundColor", e.target.value)
                  }
                  className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Spacing */}
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-900 mb-3">Spacing</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Padding
              </label>
              <select
                value={selectedComponent.style.padding}
                onChange={(e) => handleStyleChange("padding", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
              >
                <option value="p-0">None</option>
                <option value="p-2">Small</option>
                <option value="p-4">Medium</option>
                <option value="p-6">Large</option>
                <option value="p-8">Extra Large</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Margin
              </label>
              <select
                value={selectedComponent.style.margin}
                onChange={(e) => handleStyleChange("margin", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
              >
                <option value="m-0">None</option>
                <option value="m-2">Small</option>
                <option value="m-4">Medium</option>
                <option value="m-6">Large</option>
                <option value="m-8">Extra Large</option>
              </select>
            </div>
          </div>
          {/* Preview Gap */}
          <div className="mt-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Preview Gap (space between components)
            </label>
            <select
              value={selectedComponent.gap || 0}
              onChange={(e) =>
                onUpdateComponent({
                  ...selectedComponent,
                  gap: Number(e.target.value),
                })
              }
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
            >
              <option value={0}>None</option>
              <option value={2}>Small</option>
              <option value={4}>Medium</option>
              <option value={6}>Large</option>
              <option value={8}>Extra Large</option>
            </select>
          </div>
        </div>

        {/* Border */}
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-900 mb-3">Border</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Width
                </label>
                <select
                  value={selectedComponent.style.borderWidth}
                  onChange={(e) =>
                    handleStyleChange("borderWidth", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
                >
                  <option value="border-0">None</option>
                  <option value="border">1px</option>
                  <option value="border-2">2px</option>
                  <option value="border-4">4px</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Style
                </label>
                <select
                  value={selectedComponent.style.borderStyle}
                  onChange={(e) =>
                    handleStyleChange("borderStyle", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Border Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={selectedComponent.style.borderColor}
                  onChange={(e) =>
                    handleStyleChange("borderColor", e.target.value)
                  }
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedComponent.style.borderColor}
                  onChange={(e) =>
                    handleStyleChange("borderColor", e.target.value)
                  }
                  className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Border Radius
              </label>
              <select
                value={selectedComponent.style.borderRadius}
                onChange={(e) =>
                  handleStyleChange("borderRadius", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
              >
                <option value="rounded-none">None</option>
                <option value="rounded-sm">Small</option>
                <option value="rounded">Medium</option>
                <option value="rounded-lg">Large</option>
                <option value="rounded-xl">Extra Large</option>
                <option value="rounded-full">Full</option>
              </select>
            </div>
          </div>
        </div>

        {/* Effects */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-3">Effects</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Opacity
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={selectedComponent.style.opacity}
                onChange={(e) =>
                  handleStyleChange("opacity", parseFloat(e.target.value))
                }
                className="w-full accent-blue-500"
              />
              <div className="text-xs text-gray-500 mt-1">
                {Math.round(selectedComponent.style.opacity * 100)}%
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Shadow
              </label>
              <select
                value={selectedComponent.style.boxShadow}
                onChange={(e) => handleStyleChange("boxShadow", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
              >
                <option value="shadow-none">None</option>
                <option value="shadow-sm">Small</option>
                <option value="shadow">Medium</option>
                <option value="shadow-lg">Large</option>
                <option value="shadow-xl">Extra Large</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;
