import React from "react";
import { Monitor, Smartphone, X } from "lucide-react";
import { ComponentData, PreviewMode } from "../types";
import ComponentRenderer from "./ComponentRenderer";

interface PreviewPanelProps {
  components: ComponentData[];
  onClose: () => void;
  gap?: number;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  components,
  onClose,
  gap = 0,
}) => {
  const [previewMode, setPreviewMode] = React.useState<PreviewMode>({
    type: "desktop",
    width: 1200,
    height: 800,
  });

  const previewModes: PreviewMode[] = [
    { type: "desktop", width: 1200, height: 800 },
    { type: "mobile", width: 375, height: 667 },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-7xl max-h-[90vh] w-full mx-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
            <div className="flex items-center space-x-2">
              {previewModes.map((mode) => (
                <button
                  key={mode.type}
                  onClick={() => setPreviewMode(mode)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    previewMode.type === mode.type
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {mode.type === "desktop" ? (
                    <Monitor className="w-4 h-4 mr-2" />
                  ) : (
                    <Smartphone className="w-4 h-4 mr-2" />
                  )}
                  {mode.type === "desktop" ? "Desktop" : "Mobile"}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 p-8 bg-gray-100 overflow-auto">
          <div className="flex justify-center">
            <div
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              style={{
                width: previewMode.width,
                minHeight: previewMode.height,
                maxWidth: "100%",
              }}
            >
              {previewMode.type === "desktop" ? (
                <DesktopPreview components={components} gap={gap} />
              ) : (
                <MobilePreview components={components} gap={gap} />
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-center text-sm text-gray-600">
            {previewMode.width} × {previewMode.height} pixels
          </div>
        </div>
      </div>
    </div>
  );
};

const DesktopPreview: React.FC<{
  components: ComponentData[];
  gap: number;
}> = ({ components, gap }) => {
  return (
    <div className="p-8">
      <div className={`grid grid-cols-12 ${gap ? `gap-${gap}` : ""}`}>
        {components.map((component) => (
          <div
            key={component.id}
            style={{
              gridColumn: `${component.gridColumn + 1} / span ${
                component.gridSpan
              }`,
              gridRow: `${component.gridRow + 1} / span ${
                component.gridRowSpan
              }`,
            }}
          >
            <ComponentRenderer component={component} isPreview={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

const MobilePreview: React.FC<{ components: ComponentData[]; gap: number }> = ({
  components,
  gap,
}) => {
  // Sort components by row, then by column for mobile stacking
  const sortedComponents = [...components].sort((a, b) => {
    if (a.gridRow !== b.gridRow) return a.gridRow - b.gridRow;
    return a.gridColumn - b.gridColumn;
  });

  return (
    <div className={`p-4 ${gap ? `space-y-${gap}` : ""}`}>
      {sortedComponents.map((component) => (
        <div key={component.id} className="w-full">
          <ComponentRenderer component={component} isPreview={true} />
        </div>
      ))}
    </div>
  );
};

export default PreviewPanel;
