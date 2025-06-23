import React, { useState, useEffect } from 'react';
import { ComponentData } from '../types';
import { parseMarkdown } from '../utils/markdown';

interface TextComponentProps {
  component: ComponentData;
  onUpdate: (component: ComponentData) => void;
  isEditing: boolean;
  isPreviewMode: boolean;
}

const TextComponent: React.FC<TextComponentProps> = ({
  component,
  onUpdate,
  isEditing,
  isPreviewMode,
}) => {
  const [localContent, setLocalContent] = useState(component.content);

  useEffect(() => {
    setLocalContent(component.content);
  }, [component.content]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setLocalContent(newContent);
    onUpdate({ ...component, content: newContent });
  };

  if (isEditing && !isPreviewMode) {
    return (
      <div className="p-4 h-full">
        <div className="mb-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Content (Markdown supported)
          </label>
          <textarea
            value={localContent}
            onChange={handleContentChange}
            className="w-full h-48 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
            placeholder="# Your Title Here

Write your **markdown** content here. You can use:

- Headers with #, ##, ###
- **Bold text**
- *Italic text*
- `code blocks`"
            autoFocus
          />
        </div>
        <div className="text-xs text-gray-500">
          Preview will update as you type
        </div>
      </div>
    );
  }

  return (
    <div className={`${isPreviewMode ? 'p-0' : 'p-4'} h-full overflow-auto`}>
      <div 
        className="prose prose-sm max-w-none text-gray-900"
        dangerouslySetInnerHTML={{ 
          __html: parseMarkdown(component.content) 
        }}
      />
    </div>
  );
};

export default TextComponent;