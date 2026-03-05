import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  FileText, 
  FolderOpen, 
  Image, 
  Music2, 
  Monitor, 
  Settings, 
  Printer, 
  HelpCircle, 
  Search, 
  Play,
  LogOut,
  Power
} from 'lucide-react';
import { ReactNode } from 'react';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onItemClick: (action: string) => void;
}

interface MenuItemProps {
  icon: ReactNode;
  label: string;
  description?: string;
  onClick?: () => void;
  hasArrow?: boolean;
  iconBg?: string;
}

function MenuItem({ icon, label, description, onClick, hasArrow, iconBg }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-primary/90 group text-left"
    >
      <div className={`w-8 h-8 flex items-center justify-center rounded ${iconBg || ''}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-semibold text-foreground group-hover:text-white block truncate">
          {label}
        </span>
        {description && (
          <span className="text-xs text-muted-foreground group-hover:text-white/80 block truncate">
            {description}
          </span>
        )}
      </div>
      {hasArrow && (
        <span className="text-muted-foreground group-hover:text-white">▶</span>
      )}
    </button>
  );
}

function RightMenuItem({ icon, label, onClick, hasArrow }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-1.5 hover:bg-primary text-left group"
    >
      <div className="w-6 h-6 flex items-center justify-center text-primary group-hover:text-white">
        {icon}
      </div>
      <span className="flex-1 text-sm font-medium text-foreground group-hover:text-white">
        {label}
      </span>
      {hasArrow && (
        <span className="text-muted-foreground group-hover:text-white text-xs">▶</span>
      )}
    </button>
  );
}

export function StartMenu({ isOpen, onClose, userName, onItemClick }: StartMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
          />
          
          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            className="fixed bottom-10 left-0 z-40 w-96 rounded-tr-lg overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(180deg, hsl(220, 85%, 45%) 0%, hsl(220, 85%, 40%) 100%)',
            }}
          >
            {/* User Header */}
            <div 
              className="flex items-center gap-3 px-4 py-3"
              style={{
                background: 'linear-gradient(180deg, hsl(220, 85%, 50%) 0%, hsl(220, 85%, 40%) 100%)',
              }}
            >
              <div className="w-12 h-12 rounded-md overflow-hidden border-2 border-white/50 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <span className="font-bold text-white text-lg">{userName}</span>
            </div>

            {/* Main Content */}
            <div className="flex">
              {/* Left Column - Programs */}
              <div className="w-1/2 bg-white py-2">
                <MenuItem
                  icon={<Monitor className="w-6 h-6 text-blue-600" />}
                  label="Internet"
                  description="Internet Explorer"
                  onClick={() => onItemClick('internet')}
                />
                <MenuItem
                  icon={<FileText className="w-6 h-6 text-blue-500" />}
                  label="E-mail"
                  description="Outlook Express"
                  onClick={() => onItemClick('email')}
                />
                
                <div className="border-t border-border my-2" />
                
                <MenuItem
                  icon={<Search className="w-6 h-6 text-yellow-600" />}
                  label="Search Projects"
                  onClick={() => onItemClick('search')}
                />
                <MenuItem
                  icon={<FolderOpen className="w-6 h-6 text-yellow-500" />}
                  label="My Projects"
                  onClick={() => onItemClick('projects')}
                />
                <MenuItem
                  icon={<FileText className="w-6 h-6 text-blue-400" />}
                  label="Resume"
                  onClick={() => onItemClick('resume')}
                />
                <MenuItem
                  icon={<User className="w-6 h-6 text-green-600" />}
                  label="About Me"
                  onClick={() => onItemClick('about')}
                />
                
                <div className="border-t border-border my-2 mx-2" />
                
                <div className="px-3 py-2">
                  <button 
                    onClick={() => onItemClick('all-programs')}
                    className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary"
                  >
                    All Programs
                    <span className="text-green-600">▶</span>
                  </button>
                </div>
              </div>

              {/* Right Column - Places */}
              <div className="w-1/2 py-2" style={{ background: 'hsl(210, 40%, 93%)' }}>
                <RightMenuItem
                  icon={<FolderOpen className="w-5 h-5" />}
                  label="My Documents"
                  onClick={() => onItemClick('documents')}
                />
                <RightMenuItem
                  icon={<Image className="w-5 h-5" />}
                  label="My Pictures"
                  hasArrow
                  onClick={() => onItemClick('pictures')}
                />
                <RightMenuItem
                  icon={<Music2 className="w-5 h-5" />}
                  label="My Music"
                  hasArrow
                  onClick={() => onItemClick('music')}
                />
                <RightMenuItem
                  icon={<Monitor className="w-5 h-5" />}
                  label="My Computer"
                  onClick={() => onItemClick('computer')}
                />
                
                <div className="border-t border-primary/20 my-2" />
                
                <RightMenuItem
                  icon={<Settings className="w-5 h-5" />}
                  label="Control Panel"
                  onClick={() => onItemClick('control-panel')}
                />
                <RightMenuItem
                  icon={<Printer className="w-5 h-5" />}
                  label="Printers and Faxes"
                  onClick={() => onItemClick('printers')}
                />
                
                <div className="border-t border-primary/20 my-2" />
                
                <RightMenuItem
                  icon={<HelpCircle className="w-5 h-5" />}
                  label="Help and Support"
                  onClick={() => onItemClick('help')}
                />
                <RightMenuItem
                  icon={<Search className="w-5 h-5" />}
                  label="Search"
                  onClick={() => onItemClick('search')}
                />
                <RightMenuItem
                  icon={<Play className="w-5 h-5" />}
                  label="Run..."
                  onClick={() => onItemClick('run')}
                />
              </div>
            </div>

            {/* Footer */}
            <div 
              className="flex items-center justify-end gap-4 px-4 py-2"
              style={{
                background: 'linear-gradient(180deg, hsl(220, 85%, 42%) 0%, hsl(220, 85%, 35%) 100%)',
              }}
            >
              <button 
                onClick={() => onItemClick('logoff')}
                className="flex items-center gap-2 text-white/90 hover:text-white text-sm"
              >
                <LogOut className="w-4 h-4" />
                Log Off
              </button>
              <button 
                onClick={() => onItemClick('shutdown')}
                className="flex items-center gap-2 text-white/90 hover:text-white text-sm"
              >
                <Power className="w-4 h-4" />
                Turn Off Computer
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
