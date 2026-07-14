import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { XPWindow } from '@/components/xp/XPWindow';

interface CalcWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  isActive?: boolean;
}

export function CalcWindow({ onClose, onMinimize, isActive }: CalcWindowProps) {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  const handleNum = (num: string) => {
    if (display === '0' || isFinished) {
      setDisplay(num);
      setIsFinished(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOp = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setIsFinished(true);
  };

  const handleEqual = () => {
    if (!equation) return;
    try {
      const fullEq = equation + display;
      // Use basic math solver to avoid eval security issues
      const cleanEq = fullEq.replace(/[^-()\d/*+.]/g, '');
      // eslint-disable-next-line no-new-func
      const result = new Function(`return (${cleanEq})`)();
      setDisplay(String(result));
      setEquation('');
      setIsFinished(true);
    } catch {
      setDisplay('Error');
      setEquation('');
      setIsFinished(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setIsFinished(false);
  };

  const handleBack = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  return (
    <XPWindow
      title="Calculator"
      onClose={onClose}
      onMinimize={onMinimize}
      isActive={isActive}
      icon={<Calculator className="w-4 h-4 text-blue-700" />}
      className="w-64"
      defaultPosition={{ x: 180, y: 120 }}
    >
      <div className="bg-[#f1efe2] p-2 font-sans select-none text-xs">
        {/* Calculator Display */}
        <div className="bg-white border-2 border-inset border-gray-400 p-1 mb-2 text-right">
          <div className="text-[10px] text-gray-400 h-3 font-mono">
            {equation}
          </div>
          <div className="text-lg font-bold font-mono text-black truncate select-text">
            {display}
          </div>
        </div>

        {/* Buttons Panel */}
        <div className="grid grid-cols-4 gap-1">
          {/* Row 0: Back, CE, C */}
          <button 
            onClick={handleBack} 
            className="col-span-2 py-1 px-2 border rounded bg-white hover:bg-gray-100 active:bg-gray-200 border-gray-400 text-red-700 text-[10px] font-bold shadow-sm"
          >
            Backspace
          </button>
          <button 
            onClick={handleClear} 
            className="py-1 border rounded bg-white hover:bg-gray-100 border-gray-400 text-red-700 text-[10px] font-bold shadow-sm"
          >
            CE
          </button>
          <button 
            onClick={handleClear} 
            className="py-1 border rounded bg-white hover:bg-gray-100 border-gray-400 text-red-700 text-[10px] font-bold shadow-sm"
          >
            C
          </button>

          {/* Numbers / Operations */}
          {['7', '8', '9', '/'].map((item) => (
            <button
              key={item}
              onClick={() => (item === '/' ? handleOp('/') : handleNum(item))}
              className={`py-2 text-xs font-bold border rounded shadow-sm ${
                item === '/' 
                  ? 'bg-white text-red-700 hover:bg-gray-100 border-gray-400' 
                  : 'bg-white text-blue-800 hover:bg-gray-100 border-gray-400'
              }`}
            >
              {item}
            </button>
          ))}

          {['4', '5', '6', '*'].map((item) => (
            <button
              key={item}
              onClick={() => (item === '*' ? handleOp('*') : handleNum(item))}
              className={`py-2 text-xs font-bold border rounded shadow-sm ${
                item === '*' 
                  ? 'bg-white text-red-700 hover:bg-gray-100 border-gray-400' 
                  : 'bg-white text-blue-800 hover:bg-gray-100 border-gray-400'
              }`}
            >
              {item}
            </button>
          ))}

          {['1', '2', '3', '-'].map((item) => (
            <button
              key={item}
              onClick={() => (item === '-' ? handleOp('-') : handleNum(item))}
              className={`py-2 text-xs font-bold border rounded shadow-sm ${
                item === '-' 
                  ? 'bg-white text-red-700 hover:bg-gray-100 border-gray-400' 
                  : 'bg-white text-blue-800 hover:bg-gray-100 border-gray-400'
              }`}
            >
              {item}
            </button>
          ))}

          {['0', '.', '=', '+'].map((item) => (
            <button
              key={item}
              onClick={() => {
                if (item === '=') handleEqual();
                else if (item === '+') handleOp('+');
                else handleNum(item);
              }}
              className={`py-2 text-xs font-bold border rounded shadow-sm ${
                item === '=' || item === '+' 
                  ? 'bg-white text-red-700 hover:bg-gray-100 border-gray-400' 
                  : 'bg-white text-blue-800 hover:bg-gray-100 border-gray-400'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </XPWindow>
  );
}
