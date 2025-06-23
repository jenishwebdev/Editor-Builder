export interface ComponentData {
  id: string;
  type: 'text' | 'image';
  gridColumn: number;
  gridRow: number;
  gridSpan: number;
  gridRowSpan: number;
  content: string;
  style: {
    fontSize: string;
    fontWeight: string;
    textAlign: 'left' | 'center' | 'right';
    color: string;
    backgroundColor: string;
    padding: string;
    margin: string;
    borderRadius: string;
    borderWidth: string;
    borderColor: string;
    borderStyle: 'solid' | 'dashed' | 'dotted' | 'none';
    opacity: number;
    boxShadow: string;
    lineHeight: string;
    letterSpacing: string;
  };
  gap?: number;
}

export interface DragData {
  type: 'text' | 'image';
  isNewComponent?: boolean;
  componentId?: string;
}

export interface GridPosition {
  row: number;
  column: number;
  span: number;
  rowSpan: number;
}

export interface PreviewMode {
  type: 'desktop' | 'mobile';
  width: number;
  height: number;
}