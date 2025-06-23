import React, { useState, useEffect } from "react";
import { AlertCircle, ExternalLink } from "lucide-react";
import { ImageComponentProps } from "../types/component";
import Input from "./common/Input";

const ImageComponent: React.FC<ImageComponentProps> = ({
  component,
  onUpdate,
  isEditing,
  isPreviewMode,
}) => {
  const [localContent, setLocalContent] = useState(component.content);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = e.target.value;
    setLocalContent(newContent);
    onUpdate({ ...component, content: newContent });
    setImageLoaded(false);
    setImageError(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoaded(false);
    setImageError(true);
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    setLocalContent(component.content);
    setImageLoaded(false);
    setImageError(false);
  }, [component.content]);

  if (isEditing && !isPreviewMode) {
    return (
      <div className="p-4 h-full">
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <Input
            type="url"
            value={localContent}
            onChange={handleContentChange}
            placeholder="https://example.com/image.jpg"
            autoFocus
          />
          <div className="mt-1 text-xs text-gray-500">
            Enter a direct image URL (jpg, png, gif, webp)
          </div>
        </div>

        {/* Preview */}
        {localContent && isValidUrl(localContent) && (
          <div className="mt-4">
            <div className="text-xs font-medium text-gray-700 mb-2">
              Preview:
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
              {!imageLoaded && !imageError && (
                <div className="h-32 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              )}

              {imageError && (
                <div className="h-32 flex items-center justify-center text-red-500">
                  <AlertCircle className="w-6 h-6 mr-2" />
                  <span className="text-sm">Failed to load image</span>
                </div>
              )}

              <img
                src={localContent}
                alt="Preview"
                className={`w-full h-32 object-cover ${
                  imageLoaded ? "block" : "hidden"
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>
          </div>
        )}

        {/* Suggested URLs */}
        <div className="mt-4">
          <div className="text-xs font-medium text-gray-700 mb-2">
            Sample Images:
          </div>
          <div className="space-y-1">
            {[
              "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg",
              "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg",
              "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
            ].map((url, index) => (
              <button
                key={index}
                onClick={() =>
                  handleContentChange({ target: { value: url } } as any)
                }
                className="text-xs text-blue-600 hover:text-blue-800 underline block truncate w-full text-left"
              >
                Sample {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!component.content || !isValidUrl(component.content)) {
    return (
      <div
        className={`${
          isPreviewMode ? "p-0" : "p-4"
        } h-full min-h-[200px] flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg`}
      >
        <div className="text-center text-gray-500">
          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
          <div className="text-sm font-medium">No Image URL</div>
          <div className="text-xs">Click edit to add an image URL</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isPreviewMode ? "" : "p-4"} h-full`}>
      <div className="relative h-full min-h-[200px] overflow-hidden rounded-lg bg-gray-50">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center text-red-500 bg-red-50">
            <div className="text-center">
              <AlertCircle className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-medium">Failed to load image</div>
              <div className="text-xs">Check the URL and try again</div>
            </div>
          </div>
        )}

        <img
          src={component.content}
          alt="User content"
          className={`w-full h-full object-cover transition-opacity duration-200 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {/* URL overlay for non-preview mode */}
        {!isPreviewMode && imageLoaded && (
          <div className="absolute bottom-2 right-2">
            <a
              href={component.content}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded hover:bg-opacity-90 transition-all"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              View Original
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageComponent;
