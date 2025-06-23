import React, { useState, useCallback, useRef } from "react";
import { Plus } from "lucide-react";
import { ComponentData, DragData } from "../types";
import DraggableComponent from "./DraggableComponent";

interface GridCanvasProps {
  components: ComponentData[];
  onUpdateComponents: (components: ComponentData[]) => void;
  selectedComponent: ComponentData | null;
  onSelectComponent: (component: ComponentData | null) => void;
  gridCols?: number;
  cellWidth?: number;
}

const GridCanvas: React.FC<GridCanvasProps> = ({
  components,
  onUpdateComponents,
  selectedComponent,
  onSelectComponent,
  gridCols = 12,
  cellWidth = 80,
}) => {
  const [dragOverCell, setDragOverCell] = useState<{
    row: number;
    column: number;
  } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const cellHeight = 80;
  const gridRows = 25; // Increased for more space

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const handleDragEnter = useCallback(
    (e: React.DragEvent, row: number, column: number) => {
      e.preventDefault();
      setDragOverCell({ row, column });
    },
    []
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverCell(null);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, row: number, column: number) => {
      e.preventDefault();
      setDragOverCell(null);

      try {
        const dragData: DragData = JSON.parse(
          e.dataTransfer.getData("application/json")
        );

        if (dragData.isNewComponent) {
          const defaultSpan = 3; // Always 3 columns wide
          const defaultRowSpan = 2; // Default 2 rows tall

          // Check if there's enough space
          const isOccupied = components.some(
            (comp) =>
              row < comp.gridRow + comp.gridRowSpan &&
              row + defaultRowSpan > comp.gridRow &&
              column < comp.gridColumn + comp.gridSpan &&
              column + defaultSpan > comp.gridColumn
          );

          if (isOccupied) return; // Don't create if space is occupied

          const newComponent: ComponentData = {
            id: Date.now().toString(),
            type: dragData.type,
            gridColumn: column,
            gridRow: row,
            gridSpan: defaultSpan,
            gridRowSpan: defaultRowSpan,
            content:
              dragData.type === "text"
                ? "# Your Title Here\n\nWrite your **markdown** content here. You can use:\n\n- Headers with #, ##, ###\n- **Bold text**\n- *Italic text*\n- `code blocks`"
                : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg",
            style: {
              fontSize: "text-base",
              fontWeight: "font-normal",
              textAlign: "left",
              color: "#000000",
              backgroundColor: "#ffffff",
              padding: "", // No padding by default
              margin: "", // No margin by default
              borderRadius: "", // No border radius by default
              borderWidth: "border-0", // No border by default
              borderColor: "#e5e7eb",
              borderStyle: "none", // No border style by default
              opacity: 1,
              boxShadow: "", // No shadow by default
              lineHeight: "1.5",
              letterSpacing: "0",
            },
          };

          onUpdateComponents([...components, newComponent]);
          onSelectComponent(newComponent);
        }
      } catch (error) {
        console.error("Error parsing drag data:", error);
      }
    },
    [components, onUpdateComponents, onSelectComponent]
  );

  const handleUpdateComponent = useCallback(
    (updatedComponent: ComponentData) => {
      onUpdateComponents(
        components.map((comp) => {
          if (comp.id === updatedComponent.id) {
            // If gridSpan or gridRowSpan are not provided in the update, preserve the existing values
            return {
              ...comp,
              ...updatedComponent,
              gridSpan: updatedComponent.gridSpan || comp.gridSpan,
              gridRowSpan: updatedComponent.gridRowSpan || comp.gridRowSpan,
            };
          }
          return comp;
        })
      );
    },
    [components, onUpdateComponents]
  );

  const handleDeleteComponent = useCallback(
    (componentId: string) => {
      onUpdateComponents(components.filter((comp) => comp.id !== componentId));
      if (selectedComponent?.id === componentId) {
        onSelectComponent(null);
      }
    },
    [components, onUpdateComponents, selectedComponent, onSelectComponent]
  );

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === canvasRef.current) {
        onSelectComponent(null);
      }
    },
    [onSelectComponent]
  );

  const isOccupied = (row: number, col: number) => {
    return components.some(
      (comp) =>
        row >= comp.gridRow &&
        row < comp.gridRow + comp.gridRowSpan &&
        col >= comp.gridColumn &&
        col < comp.gridColumn + comp.gridSpan
    );
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <div
        ref={canvasRef}
        className="relative mx-auto bg-white rounded-lg shadow-sm border border-gray-200 mt-8"
        style={{
          width: gridCols * cellWidth,
          height: gridRows * cellHeight,
        }}
        onClick={handleCanvasClick}
      >
        {/* Subtle Grid Background - Always visible but very light */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {/* Vertical lines */}
          {Array.from({ length: gridCols + 1 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px bg-gray-200"
              style={{ left: i * cellWidth }}
            />
          ))}
          {/* Horizontal lines */}
          {Array.from({ length: gridRows + 1 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px bg-gray-200"
              style={{ top: i * cellHeight }}
            />
          ))}
        </div>

        {/* Drop Zones */}
        {Array.from({ length: gridRows }).map((_, row) =>
          Array.from({ length: gridCols }).map((_, col) => {
            if (isOccupied(row, col)) return null;

            const isDragOver =
              dragOverCell?.row === row && dragOverCell?.column === col;

            return (
              <div
                key={`${row}-${col}`}
                className={`absolute transition-all duration-200 ${
                  isDragOver
                    ? "bg-blue-100 border-2 border-blue-400 border-dashed"
                    : "hover:bg-gray-50 border border-transparent"
                }`}
                style={{
                  left: col * cellWidth,
                  top: row * cellHeight,
                  width: cellWidth,
                  height: cellHeight,
                }}
                onDragOver={handleDragOver}
                onDragEnter={(e) => handleDragEnter(e, row, col)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, row, col)}
              >
                <div className="w-full h-full flex items-center justify-center opacity-0 hover:opacity-30 transition-opacity">
                  <Plus className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            );
          })
        )}

        {/* Components */}
        {components.map((component) => (
          <DraggableComponent
            key={component.id}
            component={component}
            onUpdate={handleUpdateComponent}
            onDelete={handleDeleteComponent}
            onSelect={onSelectComponent}
            isSelected={selectedComponent?.id === component.id}
            gridSize={gridCols * cellWidth}
            canvasRef={canvasRef}
            allComponents={components}
          />
        ))}

        {/* Empty State */}
        {components.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-gray-500">
              <div className="text-lg font-medium mb-2">
                Start Building Your Landing Page
              </div>
              <p className="text-sm">
                Drag components from the sidebar to get started
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GridCanvas;
