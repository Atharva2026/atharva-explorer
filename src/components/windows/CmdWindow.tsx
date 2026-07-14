import { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { XPWindow } from '@/components/xp/XPWindow';

interface CmdWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  isActive?: boolean;
  onOpenWindow: (type: 'project' | 'about' | 'skill' | 'search' | 'projects-folder' | 'my-computer' | 'internet-explorer' | 'calculator' | 'control-panel') => void;
}

interface LogLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export function CmdWindow({ onClose, onMinimize, isActive, onOpenWindow }: CmdWindowProps) {
  const [history, setHistory] = useState<LogLine[]>([
    { text: 'Microsoft Windows XP [Version 5.1.2600]', type: 'output' },
    { text: '(C) Copyright 1985-2001 Microsoft Corp.', type: 'output' },
    { text: '', type: 'output' },
    { text: 'Welcome to Atharva Shah\'s Command Prompt.', type: 'success' },
    { text: 'Type "help" to list available commands.', type: 'output' },
    { text: '', type: 'output' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newHistory = [...history, { text: `C:\\Documents and Settings\\Atharva>${trimmed}`, type: 'input' as const }];

    switch (command) {
      case 'cls':
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'help':
        newHistory.push(
          { text: 'Available commands:', type: 'success' },
          { text: '  help       - Display this help message', type: 'output' },
          { text: '  ver        - Display Windows version details', type: 'output' },
          { text: '  dir        - List directory contents of current drive', type: 'output' },
          { text: '  cat <file> - View a file (e.g. cat resume.txt, cat projects.txt)', type: 'output' },
          { text: '  systeminfo - Show information about the developer', type: 'output' },
          { text: '  calc       - Launch the Calculator utility', type: 'output' },
          { text: '  notepad    - Launch Notepad (About Me)', type: 'output' },
          { text: '  iexplore   - Launch Internet Explorer', type: 'output' },
          { text: '  exit       - Close this Command Prompt session', type: 'output' }
        );
        break;

      case 'ver':
        newHistory.push({ text: 'Microsoft Windows XP [Version 5.1.2600] (Atharva Custom Build)', type: 'output' });
        break;

      case 'exit':
        onClose();
        return;

      case 'dir':
        newHistory.push(
          { text: ' Volume in drive C has no label.', type: 'output' },
          { text: ' Volume Serial Number is 1337-CODE', type: 'output' },
          { text: '', type: 'output' },
          { text: ' Directory of C:\\Documents and Settings\\Atharva', type: 'output' },
          { text: '', type: 'output' },
          { text: '07/14/2026  05:30 PM    <DIR>          .', type: 'output' },
          { text: '07/14/2026  05:30 PM    <DIR>          ..', type: 'output' },
          { text: '07/14/2026  05:30 PM               412 resume.txt', type: 'output' },
          { text: '07/14/2026  05:30 PM               856 projects.txt', type: 'output' },
          { text: '07/14/2026  05:30 PM               244 skills.txt', type: 'output' },
          { text: '               3 File(s)          1,512 bytes', type: 'output' },
          { text: '               2 Dir(s)   42,109,234,176 bytes free', type: 'output' }
        );
        break;

      case 'cat':
      case 'type':
        const file = args[0]?.toLowerCase();
        if (file === 'resume.txt') {
          newHistory.push(
            { text: 'ATHARVA SHAH - SUMMARY', type: 'success' },
            { text: 'AI Engineer and Full-Stack Developer specializing in Agentic AI, Multi-Agent Systems, and LLM-powered applications.', type: 'output' },
            { text: 'B.Tech in Electronics & Telecommunication, Pune Institute of Computer Technology (SPPU) - GPA: 8.9', type: 'output' },
            { text: 'Email: shahatharva20@gmail.com | GitHub: Atharva2026', type: 'output' }
          );
        } else if (file === 'projects.txt') {
          newHistory.push(
            { text: 'Atharva\'s Highlighted Projects:', type: 'success' },
            { text: '1. Globe Express - Multi-Agent Travel Orchestration Engine (LangGraph/FastAPI)', type: 'output' },
            { text: '2. Nivana - Privacy-First Mental Health Platform (React/Flask/Ollama)', type: 'output' },
            { text: '3. LinkedIn Post Generator - Streamlit GenAI App', type: 'output' },
            { text: '4. Ethicraft Club Website - Next.js & Supabase portal', type: 'output' }
          );
        } else if (file === 'skills.txt') {
          newHistory.push(
            { text: 'Technical Skills:', type: 'success' },
            { text: '  AI/GenAI: LangGraph, LangChain, RAG, FAISS, Multi-Agent, Ollama', type: 'output' },
            { text: '  Backend:  FastAPI, Flask, Celery, Node.js, Express', type: 'output' },
            { text: '  Frontend: React.js, Next.js, TypeScript, TailwindCSS', type: 'output' }
          );
        } else {
          newHistory.push({ text: `File not found: ${args[0] || ''}. Try "cat resume.txt" or "cat projects.txt".`, type: 'error' });
        }
        break;

      case 'systeminfo':
        newHistory.push(
          { text: 'Host Name:           ATHARVA-XP', type: 'output' },
          { text: 'OS Name:             Microsoft Windows XP Professional', type: 'output' },
          { text: 'OS Version:          5.1.2600 Service Pack 3 Build 2600', type: 'output' },
          { text: 'System Manufacturer: Pune Institute of Computer Technology student', type: 'output' },
          { text: 'Registered Owner:    Atharva Shah', type: 'output' },
          { text: 'Processor(s):        Ollama Local Llama-3 Node + Gemini-1.5-Pro', type: 'output' },
          { text: 'GPA score:           8.9 SPPU', type: 'output' }
        );
        break;

      case 'calc':
        newHistory.push({ text: 'Launching Calculator...', type: 'success' });
        onOpenWindow('calculator');
        break;

      case 'notepad':
        newHistory.push({ text: 'Launching Notepad (About Me)...', type: 'success' });
        onOpenWindow('about');
        break;

      case 'iexplore':
        newHistory.push({ text: 'Launching Internet Explorer...', type: 'success' });
        onOpenWindow('internet-explorer');
        break;

      default:
        newHistory.push({ text: `'${command}' is not recognized as an internal or external command, operable program or batch file. Type "help" for a list of commands.`, type: 'error' });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <XPWindow
      title="C:\WINDOWS\system32\cmd.exe"
      onClose={onClose}
      onMinimize={onMinimize}
      isActive={isActive}
      icon={<Terminal className="w-4 h-4 text-gray-300" />}
      className="w-full max-w-2xl"
      defaultPosition={{ x: 160, y: 100 }}
    >
      <div 
        className="bg-black text-[#00ff00] p-3 font-mono text-xs overflow-y-auto h-[350px] leading-normal"
        onClick={() => document.getElementById('cmd-input')?.focus()}
      >
        <div className="space-y-1">
          {history.map((line, idx) => (
            <div 
              key={idx} 
              className={
                line.type === 'error' ? 'text-red-500' :
                line.type === 'success' ? 'text-cyan-400 font-bold' :
                line.type === 'input' ? 'text-white' : 'text-[#00ff00]'
              }
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* Input line */}
        <div className="flex items-center mt-1">
          <span className="text-white select-none mr-0.5">C:\Documents and Settings\Atharva&gt;</span>
          <input
            id="cmd-input"
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                executeCommand(inputVal);
              }
            }}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs focus:ring-0 p-0"
            autoFocus
          />
        </div>
        <div ref={terminalEndRef} />
      </div>
    </XPWindow>
  );
}
