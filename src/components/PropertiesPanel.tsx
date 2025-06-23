import React from "react";
import { Settings, Type, Palette, X } from "lucide-react";
import { PropertiesPanelProps } from "../types/component";
import Input from "./common/Input";
import Textarea from "./common/Textarea";
import Select from "./common/Select";
import Label from "./common/Label";

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedComponent,
  onUpdateComponent,
  onClose,
}) => {
  if (!selectedComponent) return null;

  const handleStyleChange = (property: string, value: any) => {
    onUpdateComponent({
      ...selectedComponent,
      gridSpan: selectedComponent.gridSpan,
      gridRowSpan: selectedComponent.gridRowSpan,
      style: {
        ...selectedComponent.style,
        [property]: value,
      },
    });
  };

  const handleContentChange = (content: string) => {
    onUpdateComponent({
      ...selectedComponent,
      gridSpan: selectedComponent.gridSpan,
      gridRowSpan: selectedComponent.gridRowSpan,
      content,
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
            <Textarea
              value={selectedComponent.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
              placeholder="Enter your text content..."
            />
          ) : (
            <Input
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
                <Label>Font Size</Label>
                <Select
                  value={selectedComponent.style.fontSize}
                  onChange={(e) =>
                    handleStyleChange("fontSize", e.target.value)
                  }
                >
                  <option value="text-xs">Extra Small</option>
                  <option value="text-sm">Small</option>
                  <option value="text-base">Base</option>
                  <option value="text-lg">Large</option>
                  <option value="text-xl">Extra Large</option>
                  <option value="text-2xl">2X Large</option>
                  <option value="text-3xl">3X Large</option>
                </Select>
              </div>
              <div>
                <Label>Font Weight</Label>
                <Select
                  value={selectedComponent.style.fontWeight}
                  onChange={(e) =>
                    handleStyleChange("fontWeight", e.target.value)
                  }
                >
                  <option value="font-light">Light</option>
                  <option value="font-normal">Normal</option>
                  <option value="font-medium">Medium</option>
                  <option value="font-semibold">Semibold</option>
                  <option value="font-bold">Bold</option>
                </Select>
              </div>
              <div>
                <Label>Text Align</Label>
                <Select
                  value={selectedComponent.style.textAlign}
                  onChange={(e) =>
                    handleStyleChange("textAlign", e.target.value)
                  }
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </Select>
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
              <Label>Text Color</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={selectedComponent.style.color}
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <Input
                  type="text"
                  value={selectedComponent.style.color}
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Background Color</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={selectedComponent.style.backgroundColor}
                  onChange={(e) =>
                    handleStyleChange("backgroundColor", e.target.value)
                  }
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <Input
                  type="text"
                  value={selectedComponent.style.backgroundColor}
                  onChange={(e) =>
                    handleStyleChange("backgroundColor", e.target.value)
                  }
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
              <Label>Padding</Label>
              <Select
                value={selectedComponent.style.padding}
                onChange={(e) => handleStyleChange("padding", e.target.value)}
              >
                <option value="p-0">None</option>
                <option value="p-2">Small</option>
                <option value="p-4">Medium</option>
                <option value="p-6">Large</option>
                <option value="p-8">Extra Large</option>
              </Select>
            </div>
            <div>
              <Label>Margin</Label>
              <Select
                value={selectedComponent.style.margin}
                onChange={(e) => handleStyleChange("margin", e.target.value)}
              >
                <option value="m-0">None</option>
                <option value="m-2">Small</option>
                <option value="m-4">Medium</option>
                <option value="m-6">Large</option>
                <option value="m-8">Extra Large</option>
              </Select>
            </div>
          </div>
          {/* Preview Gap */}
          <div className="mt-4">
            <Label>Preview Gap (space between components)</Label>
            <Select
              value={selectedComponent.gap || 0}
              onChange={(e) =>
                onUpdateComponent({
                  ...selectedComponent,
                  gap: Number(e.target.value),
                })
              }
            >
              <option value={0}>None</option>
              <option value={2}>Small</option>
              <option value={4}>Medium</option>
              <option value={6}>Large</option>
              <option value={8}>Extra Large</option>
            </Select>
          </div>
        </div>

        {/* Border */}
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-900 mb-3">Border</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Width</Label>
                <Select
                  value={selectedComponent.style.borderWidth}
                  onChange={(e) =>
                    handleStyleChange("borderWidth", e.target.value)
                  }
                >
                  <option value="border-0">None</option>
                  <option value="border">1px</option>
                  <option value="border-2">2px</option>
                  <option value="border-4">4px</option>
                </Select>
              </div>
              <div>
                <Label>Style</Label>
                <Select
                  value={selectedComponent.style.borderStyle}
                  onChange={(e) =>
                    handleStyleChange("borderStyle", e.target.value)
                  }
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                  <option value="none">None</option>
                </Select>
              </div>
            </div>
            <div>
              <Label>Border Color</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={selectedComponent.style.borderColor}
                  onChange={(e) =>
                    handleStyleChange("borderColor", e.target.value)
                  }
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <Input
                  type="text"
                  value={selectedComponent.style.borderColor}
                  onChange={(e) =>
                    handleStyleChange("borderColor", e.target.value)
                  }
                />
              </div>
            </div>
            <div>
              <Label>Border Radius</Label>
              <Select
                value={selectedComponent.style.borderRadius}
                onChange={(e) =>
                  handleStyleChange("borderRadius", e.target.value)
                }
              >
                <option value="rounded-none">None</option>
                <option value="rounded-sm">Small</option>
                <option value="rounded">Medium</option>
                <option value="rounded-lg">Large</option>
                <option value="rounded-xl">Extra Large</option>
                <option value="rounded-full">Full</option>
              </Select>
            </div>
          </div>
        </div>

        {/* Effects */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-3">Effects</h3>
          <div className="space-y-3">
            <div>
              <Label>Opacity</Label>
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
              <Label>Shadow</Label>
              <Select
                value={selectedComponent.style.boxShadow}
                onChange={(e) => handleStyleChange("boxShadow", e.target.value)}
              >
                <option value="shadow-none">None</option>
                <option value="shadow-sm">Small</option>
                <option value="shadow">Medium</option>
                <option value="shadow-lg">Large</option>
                <option value="shadow-xl">Extra Large</option>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;
