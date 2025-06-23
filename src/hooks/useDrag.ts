import { useState, useRef, useEffect, useCallback } from 'react';

interface UseDragOptions {
  onDrag: (x: number, y: number) => void;
  onDragEnd?: () => void;
}

export function useDrag({ onDrag, onDragEnd }: UseDragOptions) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        onDrag(dx, dy);
      }
    };
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        onDragEnd && onDragEnd();
      }
    };
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onDrag, onDragEnd]);

  return { isDragging, handleMouseDown };
} 