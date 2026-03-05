import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StartMenu } from './StartMenu';

interface TaskbarWindow {
  id: string;
  title: string;
  isMinimized: boolean;
}

interface TaskbarProps {
  windows: TaskbarWindow[];
  activeWindowId: string | null;
  onWindowClick: (id: string) => void;
  onStartMenuAction?: (action: string) => void;
  userName?: string;
}

export function Taskbar({ 
  windows, 
  activeWindowId, 
  onWindowClick, 
  onStartMenuAction,
  userName = "Atharva"
}: TaskbarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const handleStartMenuAction = (action: string) => {
    setIsStartMenuOpen(false);
    onStartMenuAction?.(action);
  };

  return (
    <>
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        userName={userName}
        onItemClick={handleStartMenuAction}
      />
      
      <motion.div
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 h-[28px] flex items-center z-40"
        style={{
          background: 'linear-gradient(180deg, #1f5bce 0%, #1f4ec5 3%, #2154c7 8%, #245bc9 15%, #2d64cd 20%, #2f66ce 50%, #245bc9 80%, #1f4fc6 95%, #1a47c0 100%)',
          borderTop: '2px solid #3168d5',
        }}
      >
        {/* Start Button */}
        <button 
          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          className="h-full flex items-center gap-1.5 px-3 font-bold text-white text-sm rounded-r-xl relative overflow-hidden"
          style={{
            background: isStartMenuOpen 
              ? 'linear-gradient(180deg, hsl(120, 55%, 38%) 0%, hsl(120, 55%, 28%) 100%)'
              : 'linear-gradient(180deg, hsl(120, 60%, 45%) 0%, hsl(120, 60%, 35%) 50%, hsl(120, 60%, 28%) 100%)',
            boxShadow: isStartMenuOpen ? 'inset 0 1px 3px rgba(0,0,0,0.3)' : 'none',
          }}
        >
          <div 
            className="absolute inset-0 rounded-r-xl"
            style={{
              background: 'linear-gradient(90deg, hsl(120, 60%, 50%) 0%, transparent 50%)',
              opacity: 0.3,
            }}
          />
          {/* Windows Logo */}
          <div className="w-5 h-5 relative z-10 flex items-center justify-center">
            <svg viewBox="0 0 88 88" className="w-full h-full">
              <rect x="2" y="2" width="38" height="38" fill="#f25022"/>
              <rect x="48" y="2" width="38" height="38" fill="#7fba00"/>
              <rect x="2" y="48" width="38" height="38" fill="#00a4ef"/>
              <rect x="48" y="48" width="38" height="38" fill="#ffb900"/>
            </svg>
          </div>
          <span className="relative z-10 italic tracking-tight" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.3)' }}>
            start
          </span>
        </button>
        
        {/* Quick Launch Separator */}
        <div className="flex items-center h-full px-1">
          <div className="w-px h-4 bg-blue-300/30" />
          <div className="w-px h-4 bg-blue-900/50 ml-px" />
        </div>
        
        {/* Open Windows */}
        <div className="flex-1 flex items-center gap-0.5 px-1 overflow-x-auto">
          {windows.map((window) => (
            <button
              key={window.id}
              onClick={() => onWindowClick(window.id)}
              className="h-[22px] px-2 text-xs text-white font-sans truncate min-w-[100px] max-w-[160px] rounded-sm flex items-center gap-1"
              style={{
                background: activeWindowId === window.id && !window.isMinimized
                  ? 'linear-gradient(180deg, hsl(220, 70%, 50%) 0%, hsl(220, 85%, 40%) 50%, hsl(220, 85%, 35%) 100%)'
                  : 'linear-gradient(180deg, hsl(220, 60%, 38%) 0%, hsl(220, 70%, 32%) 100%)',
                boxShadow: activeWindowId === window.id && !window.isMinimized
                  ? 'inset 0 0 0 1px hsl(220, 85%, 60%)'
                  : 'inset 0 0 0 1px hsl(220, 50%, 45%)',
              }}
            >
              <span className="truncate">{window.title}</span>
            </button>
          ))}
        </div>
        
        {/* System Tray */}
        <div 
          className="flex items-center h-full px-3 gap-2"
          style={{
            background: 'linear-gradient(180deg, hsl(220, 70%, 42%) 0%, hsl(220, 80%, 32%) 100%)',
            borderLeft: '1px solid hsl(220, 60%, 50%)',
          }}
        >
          {/* Tray icons placeholder */}
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-white/20 rounded-sm" />
          </div>
          <span className="text-white text-xs font-sans" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.3)' }}>
            {formattedTime}
          </span>
        </div>
      </motion.div>
    </>
  );
}
