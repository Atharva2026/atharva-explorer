import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { XPWindow } from '@/components/xp/XPWindow';
import { aboutItems } from '@/data/searchData';

interface AboutWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  isActive?: boolean;
}

export function AboutWindow({ onClose, onMinimize, isActive }: AboutWindowProps) {
  return (
    <XPWindow
      title="About - Notepad"
      onClose={onClose}
      onMinimize={onMinimize}
      isActive={isActive}
      icon={<FileText className="w-4 h-4 text-primary" />}
      className="w-full max-w-lg"
      defaultPosition={{ x: 150, y: 80 }}
    >
      {/* Notepad Menu Bar */}
      <div className="bg-secondary border-b border-border px-2 py-0.5 text-xs font-sans">
        <span className="hover:bg-muted px-2 py-0.5 cursor-default">File</span>
        <span className="hover:bg-muted px-2 py-0.5 cursor-default">Edit</span>
        <span className="hover:bg-muted px-2 py-0.5 cursor-default">Format</span>
        <span className="hover:bg-muted px-2 py-0.5 cursor-default">View</span>
        <span className="hover:bg-muted px-2 py-0.5 cursor-default">Help</span>
      </div>
      
      {/* Notepad Content */}
      <div className="bg-white p-4 min-h-[300px] font-sans text-sm leading-relaxed">
        {aboutItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4"
          >
            <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
            <p className="text-foreground whitespace-pre-wrap">{item.content}</p>
          </motion.div>
        ))}
        
        <div className="mt-6 pt-4 border-t border-muted">
          <p className="text-muted-foreground text-xs">
            📧 atharva@example.com<br />
            🔗 github.com/atharva<br />
            🌐 atharva.dev
          </p>
        </div>
        
        {/* Blinking cursor */}
        <span className="inline-block w-2 h-4 bg-foreground animate-blink" />
      </div>
    </XPWindow>
  );
}
