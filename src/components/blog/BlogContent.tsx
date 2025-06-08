
import React from 'react';

interface BlogContentProps {
  htmlContent: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ htmlContent }) => {
  const parseContent = (html: string) => {
    // Remove HTML tags and format as clean text
    return html
      .replace(/<p>/g, '\n\n')
      .replace(/<\/p>/g, '')
      .replace(/<h2>/g, '\n\n## ')
      .replace(/<\/h2>/g, '')
      .replace(/<h3>/g, '\n\n### ')
      .replace(/<\/h3>/g, '')
      .replace(/<h4>/g, '\n\n#### ')
      .replace(/<\/h4>/g, '')
      .replace(/<strong>/g, '**')
      .replace(/<\/strong>/g, '**')
      .replace(/<em>/g, '*')
      .replace(/<\/em>/g, '*')
      .replace(/<br>/g, '\n')
      .replace(/<br\/>/g, '\n')
      .split('\n\n')
      .filter(line => line.trim());
  };

  const contentLines = parseContent(htmlContent);
  
  return (
    <div className="space-y-4">
      {contentLines.map((line, index) => {
        const trimmed = line.trim();
        
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl font-bold text-swimspot-blue-green mt-8 mb-4">
              {trimmed.substring(3)}
            </h2>
          );
        } else if (trimmed.startsWith('### ')) {
          return (
            <h3 key={index} className="text-xl font-semibold text-swimspot-blue-green mt-6 mb-3">
              {trimmed.substring(4)}
            </h3>
          );
        } else if (trimmed.startsWith('#### ')) {
          return (
            <h4 key={index} className="text-lg font-medium text-swimspot-blue-green mt-4 mb-2">
              {trimmed.substring(5)}
            </h4>
          );
        } else if (trimmed) {
          // Handle bold and italic formatting
          const formatText = (text: string) => {
            const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
            return parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
              } else if (part.startsWith('*') && part.endsWith('*')) {
                return <em key={i} className="italic">{part.slice(1, -1)}</em>;
              }
              return part;
            });
          };

          return (
            <p key={index} className="text-gray-700 leading-relaxed mb-4">
              {formatText(trimmed)}
            </p>
          );
        }
        return null;
      })}
    </div>
  );
};

export default BlogContent;
