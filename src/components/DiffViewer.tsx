import React from 'react';
import { diff_match_patch } from 'diff-match-patch';

interface DiffViewerProps {
  oldText: string;
  newText: string;
  viewMode: 'inline' | 'split';
  ignoreWhitespace: boolean;
}

const dmp = new diff_match_patch();

export const DiffViewer: React.FC<DiffViewerProps> = ({ oldText, newText, viewMode, ignoreWhitespace }) => {
  const preprocessText = (text: string) => {
    if (ignoreWhitespace) {
      return text.replace(/\s+/g, '');
    }
    return text;
  };

  const computeDiff = (text1: string, text2: string) => {
    const processedText1 = preprocessText(text1);
    const processedText2 = preprocessText(text2);
    const diffs = dmp.diff_main(processedText1, processedText2);
    dmp.diff_cleanupSemantic(diffs);
    return diffs;
  };

  const renderInlineDiff = (text1: string, text2: string) => {
    const diffs = computeDiff(text1, text2);
    
    return (
      <div className="w-full bg-white rounded-lg shadow-lg p-4 font-mono text-sm">
        <pre className="whitespace-pre-wrap break-all">
          {diffs.map((diff, index) => {
            const [type, text] = diff;
            let className = '';
            
            if (type === -1) {
              className = 'bg-red-100 text-red-800 px-1 rounded';
            } else if (type === 1) {
              className = 'bg-green-100 text-green-800 px-1 rounded';
            }
            
            return (
              <span key={index} className={className}>
                {text}
              </span>
            );
          })}
        </pre>
      </div>
    );
  };

  const renderSplitDiff = (text1: string, text2: string) => {
    const diffs = computeDiff(text1, text2);
    let leftContent = '';
    let rightContent = '';

    diffs.forEach(([type, text]) => {
      if (type === -1) {
        leftContent += text;
      } else if (type === 1) {
        rightContent += text;
      } else {
        leftContent += text;
        rightContent += text;
      }
    });

    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-4 font-mono text-sm">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Original Text</h3>
          <pre className="whitespace-pre-wrap break-all">
            {computeDiff(leftContent, rightContent).map((diff, index) => {
              const [type, text] = diff;
              return (
                <span
                  key={index}
                  className={type === -1 ? 'bg-red-100 text-red-800 px-1 rounded' : ''}
                >
                  {type !== 1 ? text : ''}
                </span>
              );
            })}
          </pre>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 font-mono text-sm">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Modified Text</h3>
          <pre className="whitespace-pre-wrap break-all">
            {computeDiff(leftContent, rightContent).map((diff, index) => {
              const [type, text] = diff;
              return (
                <span
                  key={index}
                  className={type === 1 ? 'bg-green-100 text-green-800 px-1 rounded' : ''}
                >
                  {type !== -1 ? text : ''}
                </span>
              );
            })}
          </pre>
        </div>
      </div>
    );
  };

  return viewMode === 'split' 
    ? renderSplitDiff(oldText, newText)
    : renderInlineDiff(oldText, newText);
};