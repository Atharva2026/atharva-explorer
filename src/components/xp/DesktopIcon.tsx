import { ReactNode, useState } from 'react';

interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

export function DesktopIcon({ icon, label, onClick, className = '' }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(true);
    setTimeout(() => setIsSelected(false), 200);
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      onDoubleClick={handleClick}
      className={`flex flex-col items-center gap-1 p-2 focus:outline-none group w-[80px] h-[80px] ${className}`}
    >
      <div 
        className={`w-12 h-12 flex items-center justify-center transition-all ${
          isSelected ? 'brightness-75' : ''
        }`}
      >
        {icon}
      </div>
      <span 
        className={`text-[11px] font-sans text-center leading-tight max-w-full px-0.5 ${
          isSelected 
            ? 'bg-[#316ac5] text-white' 
            : 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)] group-hover:bg-[#316ac5]/70 group-hover:text-white group-focus:bg-[#316ac5]'
        }`}
        style={{ 
          textShadow: isSelected ? 'none' : '1px 1px 1px rgba(0,0,0,0.8)',
          wordBreak: 'break-word',
        }}
      >
        {label}
      </span>
    </button>
  );
}
