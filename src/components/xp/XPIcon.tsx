import { 
  Folder, 
  FileText, 
  Search, 
  User, 
  Code, 
  Briefcase,
  Star,
  Globe,
  Settings,
  HelpCircle,
  Monitor
} from 'lucide-react';

type IconName = 
  | 'folder' 
  | 'file' 
  | 'search' 
  | 'user' 
  | 'code' 
  | 'briefcase' 
  | 'star'
  | 'globe'
  | 'settings'
  | 'help'
  | 'monitor';

interface XPIconProps {
  name: IconName;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const iconMap = {
  folder: Folder,
  file: FileText,
  search: Search,
  user: User,
  code: Code,
  briefcase: Briefcase,
  star: Star,
  globe: Globe,
  settings: Settings,
  help: HelpCircle,
  monitor: Monitor,
};

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
};

export function XPIcon({ name, size = 'md', className = '' }: XPIconProps) {
  const Icon = iconMap[name];
  const pixelSize = sizeMap[size];

  return (
    <Icon 
      size={pixelSize} 
      className={`text-primary ${className}`}
      strokeWidth={1.5}
    />
  );
}
