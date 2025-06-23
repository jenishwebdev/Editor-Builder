// Simple markdown parser for basic formatting
export const parseMarkdown = (text: string): string => {
  if (!text) return '';
  
  let html = text;
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-3">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong class="font-bold">$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  html = html.replace(/_(.*?)_/g, '<em class="italic">$1</em>');
  
  // Code
  html = html.replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>');
  
  // Line breaks
  html = html.replace(/\n\n/g, '</p><p class="mb-4">');
  html = html.replace(/\n/g, '<br>');
  
  // Wrap in paragraph if no headers
  if (!html.includes('<h1>') && !html.includes('<h2>') && !html.includes('<h3>')) {
    html = `<p class="mb-4">${html}</p>`;
  }
  
  return html;
};