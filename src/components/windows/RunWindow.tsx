import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { XPWindow } from '@/components/xp/XPWindow';
import { XPButton } from '@/components/xp/XPButton';

interface RunWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  isActive?: boolean;
  onRunCommand: (command: string) => void;
}

export function RunWindow({ onClose, onMinimize, isActive, onRunCommand }: RunWindowProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onRunCommand(inputValue.trim());
      onClose();
    }
  };

  return (
    <XPWindow
      title="Run"
      onClose={onClose}
      onMinimize={onMinimize}
      isActive={isActive}
      icon={<HelpCircle className="w-4 h-4 text-blue-700" />}
      className="w-96"
      defaultPosition={{ x: 120, y: 150 }}
    >
      <form onSubmit={handleSubmit} className="bg-[#f1efe2] p-3 font-sans text-xs select-none">
        {/* Description Header with retro run icon prompt */}
        <div className="flex gap-3 items-start mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
            🏃
          </div>
          <p className="text-gray-700 leading-normal">
            Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.
          </p>
        </div>

        {/* Input box row */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-gray-700 font-medium">Open:</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 xp-input text-xs font-sans text-black"
            placeholder="e.g. cmd, calc, iexplore, notepad"
            autoFocus
          />
        </div>

        {/* Actions row */}
        <div className="flex justify-end gap-1.5 pt-2 border-t border-gray-300">
          <XPButton type="submit" variant="primary" size="sm" className="px-5">
            OK
          </XPButton>
          <XPButton type="button" onClick={onClose} size="sm" className="px-4">
            Cancel
          </XPButton>
        </div>
      </form>
    </XPWindow>
  );
}
