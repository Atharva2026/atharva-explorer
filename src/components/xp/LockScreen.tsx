import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Power } from 'lucide-react';

interface LockScreenProps {
  onLogin: () => void;
}

export function LockScreen({ onLogin }: LockScreenProps) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      onLogin();
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50"
      style={{
        background: 'linear-gradient(180deg, #1a3a6e 0%, #3a6ea5 20%, #5b8fc9 50%, #4a7eb8 80%, #1a3a6e 100%)',
      }}
    >
      {/* Top dark bar */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-[#0a1f42]" />
      
      {/* Bottom dark bar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#0a1f42]">
        <div className="flex items-center justify-between h-full px-6">
          <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
            <div className="w-7 h-7 bg-gradient-to-b from-red-500 to-red-700 rounded-sm flex items-center justify-center shadow-md">
              <Power className="w-4 h-4 text-white" />
            </div>
            <span className="font-sans text-sm">Turn off computer</span>
          </button>
          <p className="text-white/60 text-xs font-sans hidden sm:block">
            After you log on, you can explore my portfolio.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="absolute inset-0 top-16 bottom-16 flex">
        {/* Left section - Windows XP branding */}
        <div className="flex-1 flex flex-col items-center justify-center border-r border-white/10">
          {/* Windows XP Logo */}
          <div className="flex items-center gap-2 mb-4">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-4 h-4 bg-[#f25022] rounded-tl-sm" />
              <div className="w-4 h-4 bg-[#7fba00] rounded-tr-sm" />
              <div className="w-4 h-4 bg-[#00a4ef] rounded-bl-sm" />
              <div className="w-4 h-4 bg-[#ffb900] rounded-br-sm" />
            </div>
            <div>
              <span className="text-white/60 text-xs font-sans">Welcome to</span>
              <h1 className="text-white text-2xl font-bold font-sans tracking-tight">
                Atharva<span className="text-[#ff6b35] text-lg align-super ml-0.5">XP</span>
              </h1>
            </div>
          </div>
          
          <p className="text-white text-lg font-sans mt-8">
            To begin, click your user name
          </p>
        </div>

        {/* Right section - User account */}
        <div className="flex-1 flex items-center justify-center">
          <motion.button
            onClick={handleLogin}
            disabled={isLoggingIn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors cursor-pointer disabled:cursor-wait group"
          >
            {/* User avatar */}
            <div className="relative">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg border-2 border-amber-300/50 group-hover:border-white/50 transition-colors">
                <User className="w-10 h-10 text-white drop-shadow-md" />
              </div>
              {isLoggingIn && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"
                />
              )}
            </div>
            
            {/* User name */}
            <div className="text-left">
              <h2 className="text-white text-xl font-sans font-medium group-hover:text-white/90">
                Atharva
              </h2>
              {isLoggingIn && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white/60 text-sm font-sans"
                >
                  Loading your desktop...
                </motion.p>
              )}
            </div>

            {/* Arrow indicator */}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="ml-2"
            >
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[10px] border-l-white/60 group-hover:border-l-white" />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Light gradient overlay from bottom-left */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        }}
      />
    </motion.div>
  );
}
