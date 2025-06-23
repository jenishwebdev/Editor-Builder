import React, { useState, useRef, useEffect } from 'react';
import { Move, Trash2 } from 'lucide-react';
import { ComponentData } from '../types';
import ComponentRenderer from './ComponentRenderer';

interface DraggableComponentProps {
  component: ComponentData;
  onUpdate: (component: ComponentData) => void;
  onDelete: (id: string) => void;
  onSelect: (component: ComponentData) => void;
  isSelected: boolean;
  gridSize: number;
  canvasRef: React.RefObject<HTMLDivElement>;
  allComponents: ComponentData[];
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  component,
  onUpdate,
  onDelete,
  onSelect,
  isSelected,
  gridSize,
  canvasRef,
  allComponents,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>('');
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ 
    width: 0, 
    height: 0, 
    mouseX: 0, 
    mouseY: 0,
    originalWidth: 0,
    originalHeight: 0
  });
  const componentRef = useRef<HTMLDivElement>(null);

  const cellWidth = gridSize / 12;
  const cellHeight = 80;

  // Check if position is occupied by other components
  const isPositionOccupied = (newColumn: number, newRow: number, newSpan: number, newRowSpan: number) => {
    return allComponents.some(comp => {
      if (comp.id === component.id) return false;
      
      const compEndCol = comp.gridColumn + comp.gridSpan;
      const compEndRow = comp.gridRow + comp.gridRowSpan;
      const newEndCol = newColumn + newSpan;
      const newEndRow = newRow + newRowSpan;
      
      return !(
        newColumn >= compEndCol ||
        newEndCol <= comp.gridColumn ||
        newRow >= compEndRow ||
        newEndRow <= comp.gridRow
      );
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && canvasRef.current) {
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const newX = e.clientX - canvasRect.left - dragStart.x;
        const newY = e.clientY - canvasRect.top - dragStart.y;

        const newColumn = Math.max(0, Math.round(newX / cellWidth));
        const newRow = Math.max(0, Math.round(newY / cellHeight));

        // Ensure component doesn't go out of bounds
        const clampedColumn = Math.max(0, Math.min(12 - component.gridSpan, newColumn));
        const clampedRow = Math.max(0, newRow);

        // Check for collisions
        if (!isPositionOccupied(clampedColumn, clampedRow, component.gridSpan, component.gridRowSpan)) {
          onUpdate({
            ...component,
            gridColumn: clampedColumn,
            gridRow: clampedRow,
          });
        }
      }

      if (isResizing) {
        const deltaX = e.clientX - resizeStart.mouseX;
        const deltaY = e.clientY - resizeStart.mouseY;
        
        let newSpan = component.gridSpan;
        let newRowSpan = component.gridRowSpan;
        let newColumn = component.gridColumn;
        let newRow = component.gridRow;

        if (resizeDirection.includes('right')) {
          newSpan = Math.max(1, Math.min(12 - component.gridColumn, 
            resizeStart.originalWidth + Math.round(deltaX / cellWidth)));
        }
        
        if (resizeDirection.includes('left')) {
          const widthChange = Math.round(deltaX / cellWidth);
          const newWidth = Math.max(1, resizeStart.originalWidth - widthChange);
          const columnChange = resizeStart.originalWidth - newWidth;
          
          newColumn = Math.max(0, component.gridColumn + columnChange);
          newSpan = newWidth;
        }
        
        if (resizeDirection.includes('bottom')) {
          newRowSpan = Math.max(1, resizeStart.originalHeight + Math.round(deltaY / cellHeight));
        }
        
        if (resizeDirection.includes('top')) {
          const heightChange = Math.round(deltaY / cellHeight);
          const newHeight = Math.max(1, resizeStart.originalHeight - heightChange);
          const rowChange = resizeStart.originalHeight - newHeight;
          
          newRow = Math.max(0, component.gridRow + rowChange);
          newRowSpan = newHeight;
        }

        // Check bounds and collisions
        if (newColumn + newSpan <= 12 && 
            !isPositionOccupied(newColumn, newRow, newSpan, newRowSpan)) {
          onUpdate({
            ...component,
            gridColumn: newColumn,
            gridRow: newRow,
            gridSpan: newSpan,
            gridRowSpan: newRowSpan,
          });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection('');
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart, component, onUpdate, cellWidth, cellHeight, canvasRef, resizeDirection, allComponents]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === componentRef.current || componentRef.current?.contains(e.target as Node)) {
      onSelect(component);
      setIsDragging(true);
      const rect = componentRef.current?.getBoundingClientRect();
      setDragStart({
        x: e.clientX - (rect?.left || 0),
        y: e.clientY - (rect?.top || 0),
      });
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      width: component.gridSpan * cellWidth,
      height: component.gridRowSpan * cellHeight,
      mouseX: e.clientX,
      mouseY: e.clientY,
      originalWidth: component.gridSpan,
      originalHeight: component.gridRowSpan,
    });
  };

  return (
    <div
      ref={componentRef}
      className={`absolute transition-all duration-200 ease-out ${
        isSelected ? 'z-30' : 'z-10'
      } ${isDragging ? 'z-50 cursor-grabbing' : 'cursor-grab'}`}
      style={{
        left: component.gridColumn * cellWidth,
        top: component.gridRow * cellHeight,
        width: component.gridSpan * cellWidth,
        height: component.gridRowSpan * cellHeight,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Component Content */}
      <div className={`w-full h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${
        isSelected ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
      }`}>
        <ComponentRenderer component={component} />
      </div>

      {/* Selection Controls */}
      {isSelected && (
        <>
          {/* Control Bar */}
          <div className="absolute -top-10 left-0 right-0 flex items-center justify-between bg-gray-900 text-white px-3 py-1 rounded-t-lg shadow-lg z-20">
            <div className="flex items-center space-x-2">
              <Move className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-medium capitalize">{component.type}</span>
              <span className="text-xs text-gray-400">
                {component.gridSpan}×{component.gridRowSpan}
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(component.id);
                }}
                className="p-1 hover:bg-red-600 rounded transition-colors"
                title="Delete component"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Resize Handles */}
          {/* Corner handles */}
          <div
            className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 cursor-nw-resize rounded-full border-2 border-white shadow-md"
            onMouseDown={(e) => handleResizeMouseDown(e, 'top-left')}
          />
          <div
            className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 cursor-ne-resize rounded-full border-2 border-white shadow-md"
            onMouseDown={(e) => handleResizeMouseDown(e, 'top-right')}
          />
          <div
            className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 cursor-sw-resize rounded-full border-2 border-white shadow-md"
            onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-left')}
          />
          <div
            className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 cursor-se-resize rounded-full border-2 border-white shadow-md"
            onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
          />

          {/* Edge handles */}
          <div
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 cursor-n-resize rounded-full border-2 border-white shadow-md"
            onMouseDown={(e) => handleResizeMouseDown(e, 'top')}
          />
          <div
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 cursor-s-resize rounded-full border-2 border-white shadow-md"
            onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')}
          />
          <div
            className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 cursor-w-resize rounded-full border-2 border-white shadow-md"
            onMouseDown={(e) => handleResizeMouseDown(e, 'left')}
          />
          <div
            className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 cursor-e-resize rounded-full border-2 border-white shadow-md"
            onMouseDown={(e) => handleResizeMouseDown(e, 'right')}
          />

          {/* Grid Lines - Only show when resizing */}
          {(isResizing || isDragging) && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Vertical grid lines */}
              {Array.from({ length: component.gridSpan + 1 }).map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute top-0 bottom-0 w-px bg-blue-400 opacity-60"
                  style={{ left: (i * cellWidth) }}
                />
              ))}
              {/* Horizontal grid lines */}
              {Array.from({ length: component.gridRowSpan + 1 }).map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute left-0 right-0 h-px bg-blue-400 opacity-60"
                  style={{ top: (i * cellHeight) }}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DraggableComponent;