export interface ComponentRendererProps {
  component: import('./index').ComponentData;
  isPreview?: boolean;
}

export interface ComponentWrapperProps {
  component: import('./index').ComponentData;
  onUpdate: (component: import('./index').ComponentData) => void;
  onDelete: (id: string) => void;
  isPreviewMode: boolean;
}

export interface DraggableComponentProps {
  component: import('./index').ComponentData;
  onUpdate: (component: import('./index').ComponentData) => void;
  onDelete: (id: string) => void;
  onSelect: (component: import('./index').ComponentData) => void;
  isSelected: boolean;
  gridSize: number;
  canvasRef: React.RefObject<HTMLDivElement>;
  allComponents: import('./index').ComponentData[];
}

export interface GridCanvasProps {
  components: import('./index').ComponentData[];
  onUpdateComponents: (components: import('./index').ComponentData[]) => void;
  selectedComponent: import('./index').ComponentData | null;
  onSelectComponent: (component: import('./index').ComponentData | null) => void;
  gridCols?: number;
  cellWidth?: number;
}

export interface ImageComponentProps {
  component: import('./index').ComponentData;
  onUpdate: (component: import('./index').ComponentData) => void;
  isEditing: boolean;
  isPreviewMode: boolean;
}

export interface PreviewPanelProps {
  components: import('./index').ComponentData[];
  onClose: () => void;
  gap?: number;
}

export interface PropertiesPanelProps {
  selectedComponent: import('./index').ComponentData | null;
  onUpdateComponent: (component: import('./index').ComponentData) => void;
  onClose: () => void;
}

export interface SidebarProps {
  className?: string;
}

export interface TextComponentProps {
  component: import('./index').ComponentData;
  onUpdate: (component: import('./index').ComponentData) => void;
  isEditing: boolean;
  isPreviewMode: boolean;
} 