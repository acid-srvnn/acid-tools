import React, { useState } from 'react';
import { FileText, GitCompare, Trash2, Settings } from 'lucide-react';
import { DiffViewer } from './components/DiffViewer';
import { ViewToggle } from './components/ViewToggle';
import { TabBar } from './components/TabBar';

function App() {
  const [oldText, setOldText] = useState('');
  const [newText, setNewText] = useState('');
  const [viewMode, setViewMode] = useState<'inline' | 'split'>('inline');
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [activeTab, setActiveTab] = useState('diff-checker');

  const handleClear = () => {
    setOldText('');
    setNewText('');
  };

  const tabs = [
    { id: 'diff-checker', label: 'Diff Checker', icon: GitCompare }
    // More tools can be added here
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Acid Tools</h1>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
              <Settings className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'diff-checker' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Diff Checker</h2>
              <p className="text-gray-600">Compare your text files and see the differences</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <label className="text-gray-700 font-medium">Original Text</label>
                </div>
                <textarea
                  value={oldText}
                  onChange={(e) => setOldText(e.target.value)}
                  className="w-full h-64 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  placeholder="Paste your original text here..."
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <label className="text-gray-700 font-medium">New Text</label>
                </div>
                <textarea
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full h-64 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  placeholder="Paste your new text here..."
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <ViewToggle viewMode={viewMode} onChange={setViewMode} />
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    checked={ignoreWhitespace}
                    onChange={(e) => setIgnoreWhitespace(e.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Ignore whitespace
                </label>
              </div>
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>

            {(oldText || newText) && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Differences:</h2>
                <DiffViewer 
                  oldText={oldText} 
                  newText={newText} 
                  viewMode={viewMode}
                  ignoreWhitespace={ignoreWhitespace}
                />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;