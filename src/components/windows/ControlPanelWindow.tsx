import { useState } from 'react';
import { Settings, Eye, User, Monitor, Laptop } from 'lucide-react';
import { XPWindow } from '@/components/xp/XPWindow';
import { XPButton } from '@/components/xp/XPButton';

interface ControlPanelWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  isActive?: boolean;
  currentWallpaper: string;
  setWallpaper: (wp: string) => void;
  userName: string;
  setUserName: (name: string) => void;
}

export function ControlPanelWindow({
  onClose,
  onMinimize,
  isActive,
  currentWallpaper,
  setWallpaper,
  userName,
  setUserName,
}: ControlPanelWindowProps) {
  const [activeCategory, setActiveCategory] = useState<'main' | 'appearance' | 'users'>('main');
  const [tempName, setTempName] = useState(userName);

  const wallpapers = [
    { id: 'bliss', name: 'Classic Bliss', type: 'image' },
    { id: 'solid-blue', name: 'Solid Blue (#3a6ea5)', type: 'color', val: '#3a6ea5' },
    { id: 'solid-olive', name: 'Solid Olive (#4c5b36)', type: 'color', val: '#4c5b36' },
    { id: 'solid-silver', name: 'Solid Silver (#aca899)', type: 'color', val: '#aca899' },
    { id: 'neon-cyber', name: 'Red Moon Desert', type: 'gradient', val: 'linear-gradient(135deg, #2c003e 0%, #03001e 50%, #730068 100%)' }
  ];

  return (
    <XPWindow
      title="Control Panel"
      onClose={onClose}
      onMinimize={onMinimize}
      isActive={isActive}
      icon={<Settings className="w-4 h-4 text-blue-800" />}
      className="w-full max-w-lg"
      defaultPosition={{ x: 140, y: 70 }}
    >
      <div className="flex bg-white h-[350px] font-sans text-xs">
        {/* Left Side Info Panel */}
        <div
          className="w-40 flex-shrink-0 p-3 space-y-3"
          style={{
            background: 'linear-gradient(180deg, #7ba2d1 0%, #6b94c7 100%)',
          }}
        >
          <div className="bg-white/80 p-2 rounded-[3px] shadow-sm">
            <h3 className="font-bold text-[#215dc6] mb-1">Control Panel</h3>
            <p className="text-[10px] text-gray-600">
              Customize the appearance and functionality of your retro desktop.
            </p>
          </div>

          <div className="bg-white/80 p-2 rounded-[3px] shadow-sm space-y-1">
            <button
              onClick={() => setActiveCategory('main')}
              className="text-[#215dc6] hover:underline font-bold block w-full text-left"
            >
              🏠 Control Panel Home
            </button>
            <button
              onClick={() => setActiveCategory('appearance')}
              className="text-[#215dc6] hover:underline block w-full text-left"
            >
              🎨 Change Wallpaper
            </button>
            <button
              onClick={() => setActiveCategory('users')}
              className="text-[#215dc6] hover:underline block w-full text-left"
            >
              👤 Change User Name
            </button>
          </div>
        </div>

        {/* Right Side Main Area */}
        <div className="flex-1 p-4 overflow-y-auto">
          {activeCategory === 'main' && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-gray-800 border-b pb-1">Pick a Category</h2>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveCategory('appearance')}
                  className="flex items-start gap-3 p-2 rounded hover:bg-blue-50 text-left border border-transparent hover:border-blue-200 transition-colors"
                >
                  <Eye className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-[#215dc6] block">Appearance and Themes</span>
                    <span className="text-[10px] text-gray-500 block">Change desktop wallpaper or colors.</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveCategory('users')}
                  className="flex items-start gap-3 p-2 rounded hover:bg-blue-50 text-left border border-transparent hover:border-blue-200 transition-colors"
                >
                  <User className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-[#215dc6] block">User Accounts</span>
                    <span className="text-[10px] text-gray-500 block">Change username on start menu and lockscreen.</span>
                  </div>
                </button>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-gray-500">
                <Laptop className="w-4 h-4" />
                <span>Windows Version: AtharvaXP v2026.7.14</span>
              </div>
            </div>
          )}

          {activeCategory === 'appearance' && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-gray-800 border-b pb-1">Desktop Display Settings</h2>
              <p className="text-gray-600">Select a wallpaper to apply to the desktop background:</p>

              <div className="space-y-1 max-h-48 overflow-y-auto border border-gray-300 rounded p-1">
                {wallpapers.map((wp) => (
                  <button
                    key={wp.id}
                    onClick={() => setWallpaper(wp.id)}
                    className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between ${
                      currentWallpaper === wp.id
                        ? 'bg-[#316ac5] text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="font-medium">{wp.name}</span>
                    <span className="text-[9px] uppercase opacity-75">{wp.type}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <XPButton onClick={() => setActiveCategory('main')} size="sm">
                  Back
                </XPButton>
              </div>
            </div>
          )}

          {activeCategory === 'users' && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-gray-800 border-b pb-1">User Account Settings</h2>
              <p className="text-gray-600">Change your desktop session profile name:</p>

              <div className="space-y-2 max-w-xs">
                <div>
                  <label className="block text-gray-500 font-bold mb-1">New User Name:</label>
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="xp-input w-full text-xs font-sans"
                    maxLength={15}
                  />
                </div>

                <div className="flex gap-2">
                  <XPButton
                    onClick={() => {
                      if (tempName.trim()) {
                        setUserName(tempName.trim());
                      }
                    }}
                    variant="primary"
                    size="sm"
                  >
                    Apply Name
                  </XPButton>
                  <XPButton onClick={() => setActiveCategory('main')} size="sm">
                    Cancel
                  </XPButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </XPWindow>
  );
}
