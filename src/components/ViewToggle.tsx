import React from 'react';
import { Columns, AlignJustify } from 'lucide-react';

interface ViewToggleProps {
  viewMode: 'inline' | 'split';
  onChange: (mode: 'inline' | 'split') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onChange }) => {
  return (
    <div className="flex bg-white rounded-lg shadow-sm p-1 gap-1">
      <button
        onClick={() => onChange('inline')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
          viewMode === 'inline'
            ? 'bg-indigo-100 text-indigo-700'
            : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        <AlignJustify className="w-4 h-4" />
        <span className="text-sm font-medium">Inline</span>
      </button>
      <button
        onClick={() => onChange('split')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
          viewMode === 'split'
            ? 'bg-indigo-100 text-indigo-700'
            : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        <Columns className="w-4 h-4" />
        <span className="text-sm font-medium">Split</span>
      </button>
    </div>
  );
};