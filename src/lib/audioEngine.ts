let isAudioEnabled = false;
let audioCtx: AudioContext | null = null;
let chiptuneInterval: any = null;

export const setAudioEnabled = (enabled: boolean) => {
  isAudioEnabled = enabled;
  if (enabled && !audioCtx) {
    // Initialize AudioContext on user interaction
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
};

export const getAudioEnabled = () => isAudioEnabled;

const getContext = (): AudioContext | null => {
  if (!isAudioEnabled) return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// 1. Play Startup Chime (XP pentatonic chord ascension)
export const playStartupChime = () => {
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [155.56, 233.08, 311.13, 392.00, 466.16, 523.25, 622.25]; // Eb3, Bb3, Eb4, G4, Bb4, C5, Eb5
  
  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // XP warm brass/pad effect
    osc.type = index % 2 === 0 ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, now + index * 0.08);
    
    // Smooth envelope
    gainNode.gain.setValueAtTime(0, now + index * 0.08);
    gainNode.gain.linearRampToValueAtTime(0.12, now + index * 0.08 + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 1.8);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(now + index * 0.08);
    osc.stop(now + index * 0.08 + 2.0);
  });
};

// 2. Play XP Error "Ding" (high frequency bell alert)
export const playErrorDing = () => {
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // High bell tone
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(880, now); // A5
  
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(440, now); // A4
  
  gainNode.gain.setValueAtTime(0.2, now);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
  
  osc1.connect(gainNode);
  osc2.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  osc1.start(now);
  osc2.start(now);
  
  osc1.stop(now + 0.5);
  osc2.stop(now + 0.5);
};

// 3. Play Recycle Bin Crumpled Paper Crunch (synthesized white noise)
export const playRecycleBin = () => {
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const bufferSize = ctx.sampleRate * 0.4; // 0.4 seconds
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  
  // Generate white noise
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  
  const noiseNode = ctx.createBufferSource();
  noiseNode.buffer = buffer;
  
  // Bandpass filter to make it sound crunchier
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1000, now);
  filter.Q.setValueAtTime(1.5, now);
  
  // Crunch volume envelope
  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0.2, now);
  gainNode.gain.linearRampToValueAtTime(0.05, now + 0.1);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
  
  noiseNode.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  noiseNode.start(now);
  noiseNode.stop(now + 0.42);
};

// 4. Play Minesweeper click
export const playMinesweeperClick = () => {
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
  
  gainNode.gain.setValueAtTime(0.08, now);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
  
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  osc.start(now);
  osc.stop(now + 0.07);
};

// 5. Play Winamp Chiptune Loop (8-bit music arpeggiator)
export const playChiptuneLoop = (isPlaying: boolean, onBeat?: (index: number) => void) => {
  if (chiptuneInterval) {
    clearInterval(chiptuneInterval);
    chiptuneInterval = null;
  }
  
  if (!isPlaying) return;
  
  const ctx = getContext();
  if (!ctx) return;
  
  // Simple retro game progression melody arpeggio
  const melody = [
    261.63, 329.63, 392.00, 523.25, // C chord arpeggio
    293.66, 349.23, 440.00, 587.33, // Dm chord arpeggio
    349.23, 440.00, 523.25, 698.46, // F chord arpeggio
    392.00, 493.88, 587.33, 783.99  // G chord arpeggio
  ];
  
  let step = 0;
  
  chiptuneInterval = setInterval(() => {
    const c = getContext();
    if (!c) return;
    
    const now = c.currentTime;
    const osc = c.createOscillator();
    const gainNode = c.createGain();
    
    // 8-bit square wave sound
    osc.type = 'square';
    const freq = melody[step % melody.length];
    osc.frequency.setValueAtTime(freq, now);
    
    gainNode.gain.setValueAtTime(0.03, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
    
    osc.connect(gainNode);
    gainNode.connect(c.destination);
    
    osc.start(now);
    osc.stop(now + 0.2);
    
    if (onBeat) {
      onBeat(step % 4);
    }
    
    step++;
  }, 200); // 120 bpm, sixteenth notes
};
