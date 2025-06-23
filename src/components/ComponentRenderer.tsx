import React from "react";
import { ComponentData } from "../types";
import { parseMarkdown } from "../utils/markdown";

interface ComponentRendererProps {
  component: ComponentData;
  isPreview?: boolean;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  isPreview = false,
}) => {
  const getStyleClasses = () => {
    const { style } = component;
    return [
      style.fontSize,
      style.fontWeight,
      `text-${style.textAlign}`,
      style.padding,
      style.margin,
      style.borderRadius,
      style.borderWidth,
      style.boxShadow,
    ]
      .filter(Boolean)
      .join(" ");
  };

  const getInlineStyles = () => {
    const { style } = component;
    return {
      color: style.color,
      backgroundColor: style.backgroundColor,
      borderColor: style.borderColor,
      borderStyle: style.borderStyle,
      opacity: style.opacity,
    };
  };

  if (component.type === "text") {
    return (
      <div
        className={`${getStyleClasses()} ${isPreview ? "" : "min-h-[60px]"}`}
        style={getInlineStyles()}
      >
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{
            __html: parseMarkdown(component.content),
          }}
        />
      </div>
    );
  }

  if (component.type === "image") {
    return (
      <div
        className={`${getStyleClasses()} ${
          isPreview ? "" : "min-h-[200px]"
        } overflow-hidden`}
        style={getInlineStyles()}
      >
        {component.content ? (
          <img
            src={component.content}
            alt="Component image"
            className="w-full h-full object-cover select-none"
            draggable={false}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default ComponentRenderer;
