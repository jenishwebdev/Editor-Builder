import { useState, useRef, useEffect, useCallback } from 'react';

interface UseResizeOptions {
  onResize: (deltaX: number, deltaY: number, direction: string) => void;
  onResizeEnd?: () => void;
}

export function useResize({ onResize, onResizeEnd }: UseResizeOptions) {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>('');
  const resizeStart = useRef({ x: 0, y: 0 });

  const handleResizeMouseDown = useCallback((e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    resizeStart.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        const deltaX = e.clientX - resizeStart.current.x;
        const deltaY = e.clientY - resizeStart.current.y;
        onResize(deltaX, deltaY, resizeDirection);
      }
    };
    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false);
        setResizeDirection('');
        onResizeEnd && onResizeEnd();
      }
    };
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, onResize, onResizeEnd, resizeDirection]);

  return { isResizing, resizeDirection, handleResizeMouseDown };
} 