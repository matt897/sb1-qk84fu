import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface Props {
  content: string | React.ReactNode;
  children?: React.ReactNode;
}

export function Tooltip({ content, children }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        className="inline-flex items-center cursor-help"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children || <HelpCircle className="w-4 h-4 text-gray-400" />}
      </div>
      {isVisible && (
        <div className="absolute z-10 w-64 p-3 text-sm bg-gray-900 text-white rounded-lg shadow-lg -translate-x-1/2 left-1/2 mt-2">
          {content}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
        </div>
      )}
    </div>
  );
}