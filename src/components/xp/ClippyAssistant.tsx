import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';

interface ClippyAssistantProps {
  onOpenWindow: (type: 'project' | 'about' | 'skill' | 'search' | 'projects-folder' | 'my-computer' | 'internet-explorer' | 'calculator' | 'control-panel' | 'cmd' | 'run' | 'recycle-bin' | 'msn' | 'minesweeper' | 'winamp') => void;
  isVisible: boolean;
  onClose: () => void;
}

export function ClippyAssistant({ onOpenWindow, isVisible, onClose }: ClippyAssistantProps) {
  const [bubbleText, setBubbleText] = useState('Welcome! I am Clippy, your office assistant. Need help browsing Atharva\'s portfolio?');
  const [showBubble, setShowBubble] = useState(true);

  const tips = [
    'Looking to recruit? Atharva specializes in Agentic AI (LangGraph, LangChain) and full-stack development!',
    'Try typing "cmd" in the Start Menu Run dialog to open the Command Prompt!',
    'Atharva graduated SPPU with a 8.9 GPA. Smart choice!',
    'Click the speaker icon in the bottom right system tray to enable retro sound effects!',
    'Bored? Check out the classic Minesweeper program in the start menu!',
    'Emptying the Recycle Bin plays a satisfying paper-crunching sound effect.',
    'Clicking the Winamp player triggers a programmatic chiptune synthesizer loop!',
  ];

  const jokes = [
    'Why do programmers wear glasses? Because they can\'t C#!',
    'There are 10 kinds of people: those who understand binary, and those who don\'t.',
    'Why did the AI go to therapy? It had too many complex nodes.',
    'How many programmers does it take to change a light bulb? None, that\'s a hardware problem!',
  ];

  const showNextTip = () => {
    setShowBubble(false);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * tips.length);
      setBubbleText(tips[idx]);
      setShowBubble(true);
    }, 300);
  };

  const tellJoke = () => {
    setShowBubble(false);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * jokes.length);
      setBubbleText(jokes[idx]);
      setShowBubble(true);
    }, 300);
  };

  // Auto tips rotation
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      if (!showBubble) {
        setShowBubble(true);
      }
      showNextTip();
    }, 20000);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-10 right-4 z-50 flex flex-col items-end pointer-events-none">
      {/* Speech Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="w-52 bg-[#ffffcc] text-black border-2 border-black rounded-lg p-2.5 shadow-lg relative mb-3 pointer-events-auto font-sans text-[11px]"
          >
            {/* Balloon Tip pointer */}
            <div className="absolute bottom-[-10px] right-8 w-0 h-0 border-t-[10px] border-t-black border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent">
              <div className="absolute top-[-11px] left-[-7px] w-0 h-0 border-t-[9px] border-t-[#ffffcc] border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent" />
            </div>

            <div className="flex justify-between items-start mb-1.5 border-b border-black/10 pb-1">
              <span className="font-bold flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5 text-blue-700" /> Office Assistant</span>
              <button 
                onClick={() => setShowBubble(false)}
                className="text-gray-500 hover:text-black"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="leading-relaxed mb-2">{bubbleText}</p>

            <div className="flex flex-col gap-1 text-left text-blue-800 font-bold select-none">
              <button onClick={showNextTip} className="hover:underline text-left">💡 Show next tip</button>
              <button onClick={tellJoke} className="hover:underline text-left">😂 Tell a joke</button>
              <button onClick={() => onOpenWindow('msn')} className="hover:underline text-left">💬 Chat with Resume Bot</button>
              <button onClick={onClose} className="text-gray-500 hover:text-red-700 hover:underline text-left mt-1">Close Clippy</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clippy Body (Programmatic Animated SVG) */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        onClick={() => setShowBubble(!showBubble)}
        className="w-16 h-20 cursor-pointer pointer-events-auto flex items-center justify-center filter drop-shadow-md"
      >
        <svg viewBox="0 0 100 120" className="w-full h-full">
          {/* Paperclip wire loops */}
          <path
            d="M 50 100 
               C 35 100, 30 85, 30 70 
               L 30 40 
               C 30 25, 45 15, 60 25 
               C 72 32, 72 50, 72 65 
               L 72 80 
               C 72 95, 55 110, 40 105
               C 25 100, 20 80, 20 60
               L 20 30
               C 20 15, 35 5, 50 15"
            fill="none"
            stroke="#b0b0b8"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 50 100 
               C 35 100, 30 85, 30 70 
               L 30 40 
               C 30 25, 45 15, 60 25 
               C 72 32, 72 50, 72 65 
               L 72 80 
               C 72 95, 55 110, 40 105
               C 25 100, 20 80, 20 60
               L 20 30
               C 20 15, 35 5, 50 15"
            fill="none"
            stroke="#d8d8e0"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Animated Eyes */}
          {/* Left Eye */}
          <ellipse cx="44" cy="35" rx="8" ry="12" fill="white" stroke="black" strokeWidth="2" />
          <circle cx="44" cy="33" r="3.5" fill="black" />
          {/* Right Eye */}
          <ellipse cx="62" cy="35" rx="8" ry="12" fill="white" stroke="black" strokeWidth="2" />
          <circle cx="62" cy="33" r="3.5" fill="black" />

          {/* Thick expressive eyebrows */}
          <path d="M 38 22 Q 44 20 48 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
          <path d="M 68 22 Q 62 20 58 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />

          {/* Cute mouth line */}
          <path d="M 46 55 Q 53 60 60 55" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
}
