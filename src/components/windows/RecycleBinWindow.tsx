import { useState } from 'react';
import { Trash2, FolderOpen, RefreshCw, FileText } from 'lucide-react';
import { XPWindow } from '@/components/xp/XPWindow';
import { XPButton } from '@/components/xp/XPButton';

interface RecycleBinWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  isActive?: boolean;
  isEmpty: boolean;
  onEmptyBin: () => void;
}

export function RecycleBinWindow({ onClose, onMinimize, isActive, isEmpty, onEmptyBin }: RecycleBinWindowProps) {
  const [deletedFiles, setDeletedFiles] = useState([
    { name: 'old_portfolio_v1.zip', size: '14.2 MB', date: '2025-12-14' },
    { name: 'tailwind-v2-backup.conf', size: '4.1 KB', date: '2026-01-02' },
    { name: 'unused_drafts_summary.docx', size: '256 KB', date: '2026-03-24' }
  ]);

  const handleEmpty = () => {
    onEmptyBin();
    setDeletedFiles([]);
  };

  return (
    <XPWindow
      title="Recycle Bin"
      onClose={onClose}
      onMinimize={onMinimize}
      isActive={isActive}
      icon={<Trash2 className="w-4 h-4 text-blue-800" />}
      className="w-full max-w-lg"
      defaultPosition={{ x: 130, y: 90 }}
    >
      <div className="flex bg-white h-[350px] font-sans text-xs">
        {/* Left Side Tasks Panel */}
        <div
          className="w-40 flex-shrink-0 p-3 space-y-3"
          style={{
            background: 'linear-gradient(180deg, #7ba2d1 0%, #6b94c7 100%)',
          }}
        >
          <div className="bg-white/80 p-2 rounded-[3px] shadow-sm">
            <h3 className="font-bold text-[#215dc6] mb-1">Recycle Bin Tasks</h3>
            <div className="space-y-1.5 mt-2">
              <button
                onClick={handleEmpty}
                disabled={isEmpty || deletedFiles.length === 0}
                className="text-[#215dc6] hover:underline disabled:opacity-40 disabled:hover:no-underline font-bold block w-full text-left"
              >
                🗑️ Empty Recycle Bin
              </button>
              <button
                onClick={() => {
                  if (isEmpty) return;
                  alert('Files restored to desktop!');
                }}
                disabled={isEmpty || deletedFiles.length === 0}
                className="text-[#215dc6] hover:underline disabled:opacity-40 disabled:hover:no-underline block w-full text-left"
              >
                🔄 Restore all items
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Main list */}
        <div className="flex-1 p-3 overflow-y-auto">
          {isEmpty || deletedFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-2">
              <Trash2 className="w-12 h-12 text-gray-300" />
              <p className="font-bold">Recycle Bin is empty</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="border border-gray-300">
                {/* Table Header */}
                <div 
                  className="grid grid-cols-[1.5fr_80px_80px] text-[10px] font-bold text-gray-700 border-b border-gray-300 bg-gray-100"
                  style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, #ece9d8 100%)',
                  }}
                >
                  <div className="px-2 py-1 border-r border-gray-300">Name</div>
                  <div className="px-2 py-1 border-r border-gray-300">Original Size</div>
                  <div className="px-2 py-1">Date Deleted</div>
                </div>

                {/* Table Body */}
                {deletedFiles.map((file, idx) => (
                  <div 
                    key={idx}
                    className="grid grid-cols-[1.5fr_80px_80px] text-[10px] border-b border-gray-100 hover:bg-blue-50 text-gray-700 py-1"
                  >
                    <div className="px-2 font-medium flex items-center gap-1 truncate">
                      <FileText className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      {file.name}
                    </div>
                    <div className="px-2 text-gray-500">{file.size}</div>
                    <div className="px-2 text-gray-500">{file.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </XPWindow>
  );
}
