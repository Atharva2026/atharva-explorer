import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, AlertTriangle, AlertCircle } from 'lucide-react';

export interface BalloonTip {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  actionKey?: string;
  duration?: number;
}

interface BalloonNotificationProps {
  notification: BalloonTip | null;
  onClose: () => void;
  onClickAction?: (actionKey: string) => void;
}

export function BalloonNotification({ notification, onClose, onClickAction }: BalloonNotificationProps) {
  useEffect(() => {
    if (!notification) return;
    const duration = notification.duration || 8000;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  if (!notification) return null;

  const getIcon = () => {
    switch (notification.type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />;
    }
  };

  const handleBodyClick = () => {
    if (notification.actionKey && onClickAction) {
      onClickAction(notification.actionKey);
    }
    onClose();
  };

  return (
    <div className="fixed bottom-9 right-4 z-50 pointer-events-none">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="w-64 bg-[#ffffe1] text-black border border-[#aca899] rounded-[7px] p-2.5 shadow-[2px_2px_5px_rgba(0,0,0,0.3)] relative pointer-events-auto font-sans text-[11px]"
          style={{
            boxShadow: 'inset -1px -1px 0 rgba(0,0,0,0.1), inset 1px 1px 0 #fff',
          }}
        >
          {/* Balloon Tip arrow pointer pointing down into the system tray */}
          <div className="absolute bottom-[-10px] right-6 w-0 h-0 border-t-[10px] border-t-[#aca899] border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent">
            <div className="absolute top-[-11px] left-[-7px] w-0 h-0 border-t-[9px] border-t-[#ffffe1] border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent" />
          </div>

          {/* Balloon Header */}
          <div className="flex justify-between items-center mb-1.5 font-bold text-gray-800">
            <div className="flex items-center gap-1.5">
              {getIcon()}
              <span>{notification.title}</span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="text-gray-400 hover:text-black hover:bg-gray-200/50 rounded-sm p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Balloon Body */}
          <div 
            onClick={handleBodyClick}
            className={`text-gray-700 leading-snug cursor-pointer ${
              notification.actionKey ? 'hover:text-blue-800 hover:underline' : ''
            }`}
          >
            {notification.message}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
