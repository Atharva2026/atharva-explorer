import { useState, useEffect } from 'react';
import { Play, Pause, Square, Music, Volume2 } from 'lucide-react';
import { XPWindow } from '@/components/xp/XPWindow';
import { playChiptuneLoop } from '@/lib/audioEngine';

interface WinampWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  isActive?: boolean;
}

export function WinampWindow({ onClose, onMinimize, isActive }: WinampWindowProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [trackTime, setTrackTime] = useState(0);
  const [eqHeights, setEqHeights] = useState([8, 12, 16, 24, 20, 14, 10, 6]);

  const tracks = [
    'Atharva Shah - Retro Developer Chiptunes.mp3',
    'Atharva Shah - Synthwave Coding Session.mp3',
    'Atharva Shah - Agentic AI Harmony.mp3'
  ];

  // Handle play/pause
  const togglePlay = (playState?: boolean) => {
    const nextState = playState !== undefined ? playState : !isPlaying;
    setIsPlaying(nextState);
    
    // Play loop arpeggiator from audioEngine
    playChiptuneLoop(nextState, (beatIdx) => {
      // Callback on each synth beat to bounce EQ visualizer bars
      setEqHeights(Array.from({ length: 8 }, () => Math.floor(Math.random() * 26) + 4));
    });
  };

  const handleStop = () => {
    setIsPlaying(false);
    playChiptuneLoop(false);
    setTrackTime(0);
    setEqHeights([2, 2, 2, 2, 2, 2, 2, 2]);
  };

  const handleNext = () => {
    handleStop();
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setTimeout(() => {
      togglePlay(true);
    }, 100);
  };

  const handlePrev = () => {
    handleStop();
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setTimeout(() => {
      togglePlay(true);
    }, 100);
  };

  // Timer simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTrackTime((prev) => prev + 1);
      // Randomize EQ heights on regular ticks too
      setEqHeights(Array.from({ length: 8 }, () => Math.floor(Math.random() * 26) + 4));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Clean up player on unmount
  useEffect(() => {
    return () => {
      playChiptuneLoop(false);
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <XPWindow
      title="Winamp"
      onClose={onClose}
      onMinimize={onMinimize}
      isActive={isActive}
      icon={<Music className="w-4 h-4 text-emerald-500" />}
      className="w-[280px]"
      defaultPosition={{ x: 100, y: 120 }}
    >
      {/* Classic Winamp Dark Interface Skin */}
      <div className="bg-[#1c1c24] text-[#00ff00] p-2.5 select-none font-mono text-[10px] border border-gray-900 rounded shadow-2xl">
        {/* Info panel row */}
        <div className="flex gap-2 bg-[#0c0c10] p-2 border border-gray-800 rounded mb-2">
          {/* Neon Time counter */}
          <div className="text-xl font-bold font-mono tracking-widest text-[#00ff00] bg-black/80 px-2 py-0.5 rounded border border-gray-900 min-w-[55px] text-center">
            {formatTime(trackTime)}
          </div>
          
          {/* Song visualizer graphic */}
          <div className="flex-1 flex gap-0.5 items-end justify-center h-8 bg-black/50 border border-gray-900 p-0.5 overflow-hidden">
            {eqHeights.map((h, i) => (
              <div 
                key={i}
                className="w-1.5 bg-gradient-to-t from-emerald-500 to-green-300 rounded-t-sm transition-all duration-100"
                style={{ height: `${isPlaying ? h : 2}px` }}
              />
            ))}
          </div>
        </div>

        {/* Song scrolling title banner */}
        <div className="bg-black/90 p-1.5 border border-gray-800 text-[9px] text-[#00ff00] truncate text-center font-bold mb-2">
          {isPlaying ? '⚡ PLAYING ⚡' : '⏸️ PAUSED ⏸️'} : {tracks[currentTrack]}
        </div>

        {/* Player volume indicator */}
        <div className="flex items-center justify-between mb-3 text-gray-400 text-[9px]">
          <span className="flex items-center gap-1"><Volume2 className="w-3 h-3 text-[#00ff00]" /> 100%</span>
          <span>kbps: 128 (8-bit synth)</span>
        </div>

        {/* Winamp Controls */}
        <div className="grid grid-cols-5 gap-1.5 border-t border-gray-800 pt-2.5">
          <button 
            onClick={handlePrev}
            className="py-1 px-1.5 bg-[#2c2c38] hover:bg-[#3d3d4e] active:bg-[#1a1a24] text-gray-300 font-bold border border-gray-800 rounded flex items-center justify-center"
            title="Previous Track"
          >
            ⏮️
          </button>
          
          <button 
            onClick={() => togglePlay()}
            className={`py-1 px-1.5 bg-[#2c2c38] hover:bg-[#3d3d4e] active:bg-[#1a1a24] font-bold border border-gray-800 rounded flex items-center justify-center ${isPlaying ? 'text-[#00ff00] border-emerald-500' : 'text-gray-300'}`}
            title="Play/Pause"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
          </button>
          
          <button 
            onClick={handleStop}
            className="py-1 px-1.5 bg-[#2c2c38] hover:bg-[#3d3d4e] active:bg-[#1a1a24] text-gray-300 font-bold border border-gray-800 rounded flex items-center justify-center"
            title="Stop"
          >
            <Square className="w-2.5 h-2.5 fill-current" />
          </button>
          
          <button 
            onClick={handleNext}
            className="py-1 px-1.5 bg-[#2c2c38] hover:bg-[#3d3d4e] active:bg-[#1a1a24] text-gray-300 font-bold border border-gray-800 rounded flex items-center justify-center"
            title="Next Track"
          >
            ⏭️
          </button>

          <div className="flex items-center justify-center text-[10px]">
            🎵
          </div>
        </div>
      </div>
    </XPWindow>
  );
}
