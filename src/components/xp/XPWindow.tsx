import { motion, useDragControls, PanInfo } from 'framer-motion';
import { useState, useRef, ReactNode } from 'react';
import { Minus, Square, X, Maximize2, ChevronLeft, ChevronRight, ChevronUp, Home, Search } from 'lucide-react';

interface XPWindowProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onMinimize?: () => void;
  isActive?: boolean;
  defaultPosition?: { x: number; y: number };
  className?: string;
  icon?: ReactNode;
  showMenuBar?: boolean;
  showToolbar?: boolean;
}

export function XPWindow({
  title,
  children,
  onClose,
  onMinimize,
  isActive = true,
  defaultPosition = { x: 100, y: 50 },
  className = '',
  icon,
  showMenuBar = false,
  showToolbar = false,
}: XPWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (!isMaximized) {
      setPosition({
        x: position.x + info.offset.x,
        y: position.y + info.offset.y,
      });
    }
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <motion.div
      ref={constraintsRef}
      className="fixed inset-0 pointer-events-none z-30"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: isMaximized ? 0 : position.x,
          y: isMaximized ? 0 : position.y,
          width: isMaximized ? '100%' : 'auto',
          height: isMaximized ? 'calc(100% - 40px)' : 'auto',
        }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        drag={!isMaximized}
        dragControls={dragControls}
        dragMomentum={false}
        dragListener={false}
        onDragEnd={handleDragEnd}
        className={`pointer-events-auto ${isMaximized ? 'fixed inset-0' : 'absolute'} ${className}`}
        style={{
          minWidth: isMaximized ? '100%' : '400px',
          maxWidth: isMaximized ? '100%' : '700px',
          maxHeight: isMaximized ? 'calc(100vh - 40px)' : '80vh',
          border: '1px solid #0055e5',
          borderRadius: '8px 8px 0 0',
          boxShadow: isActive 
            ? '0 4px 16px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)' 
            : '0 2px 8px rgba(0,0,0,0.2)',
          overflow: 'hidden',
        }}
      >
        {/* Title Bar - Classic XP Blue Gradient */}
        <div
          className="cursor-move select-none flex items-center justify-between px-2 py-1"
          style={{
            background: isActive 
              ? 'linear-gradient(180deg, #0a246a 0%, #0f3d9e 8%, #0e5ad4 18%, #1162d9 24%, #1665db 30%, #166ade 40%, #1468db 48%, #0e5acf 56%, #0856c8 64%, #054dbf 70%, #044cb7 76%, #0349af 84%, #0241a3 92%, #003d98 100%)'
              : 'linear-gradient(180deg, #6e8097 0%, #7b8fa8 50%, #6e8097 100%)',
            minHeight: '26px',
            borderRadius: '6px 6px 0 0',
          }}
          onPointerDown={(e) => {
            if (!isMaximized) {
              dragControls.start(e);
            }
          }}
        >
          <div className="flex items-center gap-1.5">
            {icon && <span className="w-4 h-4">{icon}</span>}
            <span 
              className="text-[12px] font-bold truncate text-white"
              style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.5)' }}
            >
              {title}
            </span>
          </div>
          
          <div className="flex items-center gap-[2px]">
            {onMinimize && (
              <button
                onClick={onMinimize}
                className="w-[21px] h-[21px] flex items-center justify-center rounded-sm"
                style={{
                  background: 'linear-gradient(180deg, #3c8df7 0%, #0b5dd6 45%, #0553cf 55%, #0349af 100%)',
                  border: '1px solid #0f3276',
                }}
                aria-label="Minimize"
              >
                <Minus className="w-3 h-3 text-white" />
              </button>
            )}
            <button
              onClick={toggleMaximize}
              className="w-[21px] h-[21px] flex items-center justify-center rounded-sm"
              style={{
                background: 'linear-gradient(180deg, #3c8df7 0%, #0b5dd6 45%, #0553cf 55%, #0349af 100%)',
                border: '1px solid #0f3276',
              }}
              aria-label={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? <Square className="w-2.5 h-2.5 text-white" /> : <Maximize2 className="w-2.5 h-2.5 text-white" />}
            </button>
            <button
              onClick={onClose}
              className="w-[21px] h-[21px] flex items-center justify-center rounded-sm"
              style={{
                background: 'linear-gradient(180deg, #e97a6b 0%, #cf4333 45%, #c43724 55%, #ab2615 100%)',
                border: '1px solid #7c2012',
              }}
              aria-label="Close"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        {showMenuBar && (
          <div 
            className="flex items-center gap-4 px-2 py-0.5"
            style={{ 
              background: '#ece9d8',
              borderBottom: '1px solid #aca899',
            }}
          >
            {['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'].map((item) => (
              <button 
                key={item} 
                className="text-[11px] text-gray-700 hover:text-gray-900 hover:bg-[#d6dfe9] px-1 py-0.5 rounded-sm"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Toolbar */}
        {showToolbar && (
          <div 
            className="flex items-center gap-1 px-1 py-1"
            style={{ 
              background: 'linear-gradient(180deg, #f6f8fc 0%, #e3e9f4 50%, #d9e1ef 100%)',
              borderBottom: '1px solid #a4b4c8',
            }}
          >
            {/* Back/Forward */}
            <div className="flex items-center">
              <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#c1d2ee]">
                <ChevronLeft className="w-4 h-4 text-[#21a121]" />
                <span className="text-[11px] text-gray-700">Back</span>
              </button>
              <button className="p-1 rounded hover:bg-[#c1d2ee]">
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            
            <div className="w-px h-5 bg-gray-300 mx-1" />
            
            <button className="p-1 rounded hover:bg-[#c1d2ee]">
              <ChevronUp className="w-4 h-4 text-[#dcb000]" />
            </button>
            
            <div className="w-px h-5 bg-gray-300 mx-1" />
            
            {/* Address Bar */}
            <div className="flex-1 flex items-center gap-1 bg-white border border-gray-400 rounded-sm px-1 py-0.5">
              <Home className="w-4 h-4 text-[#dcb000]" />
              <span className="text-[11px] text-gray-700">My Computer</span>
            </div>
            
            <div className="w-px h-5 bg-gray-300 mx-1" />
            
            {/* Search */}
            <div className="flex items-center gap-1 bg-white border border-gray-400 rounded-sm px-2 py-0.5 w-32">
              <span className="text-[10px] text-gray-400">Search</span>
            </div>
            <button 
              className="p-1 rounded"
              style={{ background: 'linear-gradient(180deg, #6fd66b 0%, #30b52b 100%)' }}
            >
              <ChevronRight className="w-3 h-3 text-white" />
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className="bg-white overflow-auto" style={{ maxHeight: 'calc(80vh - 80px)' }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
