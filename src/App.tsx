import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import GridCanvas from "./components/GridCanvas";
import PropertiesPanel from "./components/PropertiesPanel";
import PreviewPanel from "./components/PreviewPanel";
import { ComponentData } from "./types";

function App() {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentData | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showProperties, setShowProperties] = useState(false);
  const [gridCols, setGridCols] = useState(12);
  const [cellWidth, setCellWidth] = useState(80);

  const handleUpdateComponents = (newComponents: ComponentData[]) => {
    setComponents(newComponents);
  };

  const handleSelectComponent = (component: ComponentData | null) => {
    setSelectedComponent(component);
    setShowProperties(!!component);
  };

  const handleUpdateComponent = (updatedComponent: ComponentData) => {
    setComponents(
      components.map((comp) =>
        comp.id === updatedComponent.id ? updatedComponent : comp
      )
    );
    setSelectedComponent(updatedComponent);
  };

  const handleGridCols = (delta: number) => {
    setGridCols((c) => Math.max(4, Math.min(24, c + delta)));
  };

  const handleCellWidth = (delta: number) => {
    setCellWidth((w) => Math.max(40, Math.min(200, w + delta)));
  };

  return (
    <div className="h-screen w-screen overflow-x-hidden flex bg-gray-100">
      {/* Left Sidebar - independently scrollable */}
      <div className="h-screen max-h-screen overflow-y-auto">
        <Sidebar />
      </div>

      {/* Main Canvas and Top Bar */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Editor</h1>
            <div className="text-sm text-gray-500">
              {components.length} component{components.length !== 1 ? "s" : ""}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* <button
              onClick={() => setShowProperties(!showProperties)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                showProperties
                  ? "bg-blue-100 text-blue-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:shadow-sm"
              }`}
            >
              <Settings className="w-4 h-4 mr-2" />
              Properties
            </button> */}
            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            >
              Preview
            </button>
          </div>
        </div>

        {/* Grid controls */}
        <div className="flex flex-wrap items-center gap-4 px-6 py-2 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Grid Columns:</span>
            <button
              className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-lg font-bold"
              onClick={() => handleGridCols(-1)}
              aria-label="Decrease grid columns"
            >
              -
            </button>
            <span className="w-10 text-center text-gray-800 font-mono">
              {gridCols}
            </span>
            <button
              className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-lg font-bold"
              onClick={() => handleGridCols(1)}
              aria-label="Increase grid columns"
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Cell Width:</span>
            <button
              className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-lg font-bold"
              onClick={() => handleCellWidth(-10)}
              aria-label="Decrease cell width"
            >
              -
            </button>
            <span className="w-14 text-center text-gray-800 font-mono">
              {cellWidth}px
            </span>
            <button
              className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-lg font-bold"
              onClick={() => handleCellWidth(10)}
              aria-label="Increase cell width"
            >
              +
            </button>
          </div>
        </div>

        {/* Canvas Area - only this scrolls for the editor */}
        <div className="flex-1 flex min-h-0 relative">
          {/* Editor area with horizontal scroll */}
          <div className="flex-1 min-w-0 h-full overflow-x-auto bg-gray-50 flex items-stretch">
            <div className="mx-auto">
              <GridCanvas
                components={components}
                onUpdateComponents={handleUpdateComponents}
                selectedComponent={selectedComponent}
                onSelectComponent={handleSelectComponent}
                gridCols={gridCols}
                cellWidth={cellWidth}
              />
            </div>
          </div>
          {/* Right Properties Panel - fixed, not scrolling with editor */}
          <div
            className={`transition-all duration-300 ease-in-out h-screen max-h-screen overflow-y-auto bg-white border-l border-gray-200 ${
              showProperties ? "w-80 opacity-100" : "w-0 opacity-0"
            } overflow-hidden`}
            style={{ position: "sticky", right: 0, top: 0 }}
          >
            {showProperties && (
              <PropertiesPanel
                selectedComponent={selectedComponent}
                onUpdateComponent={handleUpdateComponent}
                onClose={() => setShowProperties(false)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <PreviewPanel
          components={components}
          onClose={() => setShowPreview(false)}
          gap={selectedComponent?.gap || 0}
        />
      )}
    </div>
  );
}

export default App;
