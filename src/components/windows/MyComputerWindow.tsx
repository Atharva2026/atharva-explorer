import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, FolderOpen, User, Globe, HardDrive, Monitor, Disc, Search, Briefcase, Home } from 'lucide-react';
import { XPWindow } from '@/components/xp/XPWindow';

interface MyComputerWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  onOpenFolder: (folderId: string) => void;
  isActive?: boolean;
}

export function MyComputerWindow({ onClose, onMinimize, onOpenFolder, isActive }: MyComputerWindowProps) {
  return (
    <XPWindow
      title="My Computer"
      onClose={onClose}
      onMinimize={onMinimize}
      isActive={isActive}
      icon={<Monitor className="w-4 h-4 text-blue-600" />}
      defaultPosition={{ x: 100, y: 60 }}
      showMenuBar
      showToolbar
    >
      <div className="flex min-h-[350px]">
        {/* Left Sidebar - Classic XP Blue */}
        <div 
          className="w-[180px] flex-shrink-0 p-2 space-y-2"
          style={{
            background: 'linear-gradient(180deg, #7ba2d1 0%, #6b94c7 50%, #5a85bc 100%)',
          }}
        >
          {/* System Tasks */}
          <div className="bg-white rounded-[3px] shadow-sm overflow-hidden">
            <button 
              className="w-full flex items-center justify-between px-2 py-1.5"
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #d6dfe9 100%)',
                borderBottom: '1px solid #a4b4c8',
              }}
            >
              <span className="text-[11px] font-bold text-[#215dc6]">System Tasks</span>
              <ChevronUp className="w-3 h-3 text-[#215dc6]" />
            </button>
            <div className="p-2 space-y-1 bg-[#d6e5f5]">
              <button className="flex items-center gap-2 text-[11px] text-[#215dc6] hover:underline w-full text-left py-0.5">
                <Search className="w-4 h-4 text-[#215dc6]" />
                View system information
              </button>
              <button className="flex items-center gap-2 text-[11px] text-[#215dc6] hover:underline w-full text-left py-0.5">
                <Briefcase className="w-4 h-4 text-[#8b6914]" />
                Add or remove programs
              </button>
            </div>
          </div>

          {/* Other Places */}
          <div className="bg-white rounded-[3px] shadow-sm overflow-hidden">
            <button 
              className="w-full flex items-center justify-between px-2 py-1.5"
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #d6dfe9 100%)',
                borderBottom: '1px solid #a4b4c8',
              }}
            >
              <span className="text-[11px] font-bold text-[#215dc6]">Other Places</span>
              <ChevronUp className="w-3 h-3 text-[#215dc6]" />
            </button>
            <div className="p-2 space-y-1 bg-[#d6e5f5]">
              <button 
                onClick={() => onOpenFolder('projects')}
                className="flex items-center gap-2 text-[11px] text-[#215dc6] hover:underline w-full text-left py-0.5"
              >
                <FolderOpen className="w-4 h-4 text-[#dcb000]" />
                My Projects
              </button>
              <button 
                onClick={() => onOpenFolder('about')}
                className="flex items-center gap-2 text-[11px] text-[#215dc6] hover:underline w-full text-left py-0.5"
              >
                <User className="w-4 h-4 text-[#e08730]" />
                About Me
              </button>
              <button 
                onClick={() => onOpenFolder('skills')}
                className="flex items-center gap-2 text-[11px] text-[#215dc6] hover:underline w-full text-left py-0.5"
              >
                <Briefcase className="w-4 h-4 text-[#8b6914]" />
                My Skills
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-[3px] shadow-sm overflow-hidden">
            <button 
              className="w-full flex items-center justify-between px-2 py-1.5"
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #d6dfe9 100%)',
                borderBottom: '1px solid #a4b4c8',
              }}
            >
              <span className="text-[11px] font-bold text-[#215dc6]">Details</span>
              <ChevronUp className="w-3 h-3 text-[#215dc6]" />
            </button>
            <div className="p-2 bg-[#d6e5f5]">
              <div className="flex items-center gap-2 mb-1">
                <Monitor className="w-8 h-8 text-[#4a7dc4]" />
              </div>
              <p className="text-[11px] text-gray-700 font-bold">My Computer</p>
              <p className="text-[10px] text-gray-500">System Folder</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white p-3 overflow-auto">
          {/* Hard Disk Drives */}
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-2 pb-1 border-b border-[#9ebae1]">
              <ChevronDown className="w-4 h-4 text-[#215dc6]" />
              <h2 className="text-[11px] font-bold text-[#215dc6]">Hard Disk Drives</h2>
            </div>
            <div className="flex flex-wrap gap-1">
              <button 
                onClick={() => onOpenFolder('projects')}
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-[#316ac5] hover:text-white group w-[140px]"
              >
                <HardDrive className="w-8 h-8 text-gray-500 group-hover:text-white flex-shrink-0" />
                <div className="text-left min-w-0">
                  <p className="text-[11px] font-medium truncate">Projects (C:)</p>
                  <p className="text-[10px] text-gray-500 group-hover:text-white/80">Local Disk</p>
                </div>
              </button>
              <button 
                onClick={() => onOpenFolder('skills')}
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-[#316ac5] hover:text-white group w-[140px]"
              >
                <HardDrive className="w-8 h-8 text-gray-500 group-hover:text-white flex-shrink-0" />
                <div className="text-left min-w-0">
                  <p className="text-[11px] font-medium truncate">Skills (D:)</p>
                  <p className="text-[10px] text-gray-500 group-hover:text-white/80">Local Disk</p>
                </div>
              </button>
            </div>
          </div>

          {/* Devices with Removable Storage */}
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-2 pb-1 border-b border-[#9ebae1]">
              <ChevronDown className="w-4 h-4 text-[#215dc6]" />
              <h2 className="text-[11px] font-bold text-[#215dc6]">Devices with Removable Storage</h2>
            </div>
            <div className="flex flex-wrap gap-1">
              <button 
                onClick={() => onOpenFolder('about')}
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-[#316ac5] hover:text-white group w-[140px]"
              >
                <Disc className="w-8 h-8 text-gray-400 group-hover:text-white flex-shrink-0" />
                <div className="text-left min-w-0">
                  <p className="text-[11px] font-medium truncate">About (E:)</p>
                  <p className="text-[10px] text-gray-500 group-hover:text-white/80">CD Drive</p>
                </div>
              </button>
            </div>
          </div>

          {/* Network */}
          <div>
            <div className="flex items-center gap-1 mb-2 pb-1 border-b border-[#9ebae1]">
              <ChevronDown className="w-4 h-4 text-[#215dc6]" />
              <h2 className="text-[11px] font-bold text-[#215dc6]">Network Drives</h2>
            </div>
            <div className="flex flex-wrap gap-1">
              <button 
                onClick={() => window.open('https://github.com/atharva', '_blank')}
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-[#316ac5] hover:text-white group w-[140px]"
              >
                <Globe className="w-8 h-8 text-[#4a7dc4] group-hover:text-white flex-shrink-0" />
                <div className="text-left min-w-0">
                  <p className="text-[11px] font-medium truncate">GitHub (Z:)</p>
                  <p className="text-[10px] text-gray-500 group-hover:text-white/80">Network Location</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </XPWindow>
  );
}
