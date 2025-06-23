import { useState } from "react";
import { ComponentData } from "../types";

export function useEditorState() {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null);
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
    setComponents((components) =>
      components.map((comp) =>
        comp.id === updatedComponent.id
          ? {
              ...comp,
              ...updatedComponent,
              gridSpan: updatedComponent.gridSpan ?? comp.gridSpan,
              gridRowSpan: updatedComponent.gridRowSpan ?? comp.gridRowSpan,
              style: { ...comp.style, ...updatedComponent.style },
            }
          : comp
      )
    );
    setSelectedComponent((prev) =>
      prev && prev.id === updatedComponent.id
        ? {
            ...prev,
            ...updatedComponent,
            gridSpan: updatedComponent.gridSpan ?? prev.gridSpan,
            gridRowSpan: updatedComponent.gridRowSpan ?? prev.gridRowSpan,
            style: { ...prev.style, ...updatedComponent.style },
          }
        : prev
    );
  };

  const handleGridCols = (delta: number) => {
    setGridCols((c) => Math.max(4, Math.min(24, c + delta)));
  };

  const handleCellWidth = (delta: number) => {
    setCellWidth((w) => Math.max(40, Math.min(200, w + delta)));
  };

  return {
    components,
    setComponents,
    selectedComponent,
    setSelectedComponent,
    showPreview,
    setShowPreview,
    showProperties,
    setShowProperties,
    gridCols,
    setGridCols,
    cellWidth,
    setCellWidth,
    handleUpdateComponents,
    handleSelectComponent,
    handleUpdateComponent,
    handleGridCols,
    handleCellWidth,
  };
} 