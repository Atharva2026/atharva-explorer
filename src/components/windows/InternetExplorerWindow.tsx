import { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, Search, RefreshCw, X, ArrowRight, Globe } from 'lucide-react';
import { XPWindow } from '@/components/xp/XPWindow';
import { XPButton } from '@/components/xp/XPButton';

interface InternetExplorerWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  isActive?: boolean;
}

export function InternetExplorerWindow({ onClose, onMinimize, isActive }: InternetExplorerWindowProps) {
  const [address, setAddress] = useState('https://github.com/Atharva2026');
  const [currentUrl, setCurrentUrl] = useState('https://github.com/Atharva2026');
  const [history, setHistory] = useState<string[]>(['https://github.com/Atharva2026']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const navigateTo = (url: string) => {
    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(cleanUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentUrl(cleanUrl);
    setAddress(cleanUrl);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const idx = historyIndex - 1;
      setHistoryIndex(idx);
      setCurrentUrl(history[idx]);
      setAddress(history[idx]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const idx = historyIndex + 1;
      setHistoryIndex(idx);
      setCurrentUrl(history[idx]);
      setAddress(history[idx]);
    }
  };

  const isMsn = currentUrl.includes('msn') || currentUrl.includes('home') || currentUrl.includes('localhost') || currentUrl === '';

  return (
    <XPWindow
      title="Internet Explorer"
      onClose={onClose}
      onMinimize={onMinimize}
      isActive={isActive}
      icon={<Globe className="w-4 h-4 text-blue-500" />}
      className="w-full max-w-3xl"
      defaultPosition={{ x: 80, y: 40 }}
      showMenuBar
    >
      <div className="flex flex-col h-[500px] bg-[#f1efe2] text-foreground font-sans">
        {/* IE Standard Buttons Toolbar */}
        <div className="flex items-center gap-1 p-1 bg-[#ece9d8] border-b border-[#aca899] text-xs">
          <button
            onClick={handleBack}
            disabled={historyIndex === 0}
            className="flex items-center gap-0.5 px-1.5 py-1 rounded hover:bg-[#c1d2ee] disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <div className="w-5 h-5 bg-[#21a121] rounded-full flex items-center justify-center text-white font-bold">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <span>Back</span>
          </button>

          <button
            onClick={handleForward}
            disabled={historyIndex >= history.length - 1}
            className="flex items-center gap-0.5 px-1.5 py-1 rounded hover:bg-[#c1d2ee] disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <div className="w-5 h-5 bg-[#21a121] rounded-full flex items-center justify-center text-white font-bold">
              <ChevronRight className="w-4 h-4" />
            </div>
            <span>Forward</span>
          </button>

          <button
            onClick={() => setCurrentUrl(currentUrl)}
            className="flex flex-col items-center px-1.5 py-0.5 rounded hover:bg-[#c1d2ee]"
          >
            <RefreshCw className="w-3.5 h-3.5 text-blue-700" />
            <span className="text-[10px]">Refresh</span>
          </button>

          <button
            onClick={() => navigateTo('https://github.com/Atharva2026')}
            className="flex flex-col items-center px-1.5 py-0.5 rounded hover:bg-[#c1d2ee]"
          >
            <Home className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[10px]">Home</span>
          </button>

          <div className="w-px h-6 bg-gray-400 mx-1" />

          <div className="flex-1 flex items-center gap-1 bg-white border border-[#7f9db9] px-1.5 py-0.5 rounded-sm">
            <span className="text-[11px] text-gray-500 select-none">Address</span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigateTo(address);
                }
              }}
              className="flex-1 bg-transparent border-none outline-none text-xs h-4 font-sans text-black"
            />
            <button
              onClick={() => navigateTo(address)}
              className="px-1 hover:bg-gray-200 rounded flex items-center justify-center"
            >
              <ArrowRight className="w-3.5 h-3.5 text-green-700" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white overflow-auto border-t border-[#aca899] p-4 text-sm">
          {currentUrl.includes('github.com/Atharva2026') ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b pb-3">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  🐙
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">GitHub - Atharva2026</h1>
                  <p className="text-xs text-blue-600">https://github.com/Atharva2026</p>
                </div>
              </div>

              <div className="bg-[#f6f8fa] border border-[#d0d7de] rounded-md p-4">
                <h2 className="text-sm font-semibold mb-2">Atharva Shah's Popular Repositories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <a
                    href="https://github.com/Atharva2026/Trip-mate"
                    target="_blank"
                    rel="noreferrer"
                    className="border border-[#d0d7de] p-3 rounded hover:bg-[#eaeef2] block text-left"
                  >
                    <span className="text-blue-600 font-bold block">Trip-mate (Globe Express)</span>
                    <span className="text-gray-500 block mt-1">Multi-Agent Travel Orchestration Engine built on LangGraph.</span>
                  </a>
                  <a
                    href="https://github.com/SarangRao20/techfiesta_mentalhealth"
                    target="_blank"
                    rel="noreferrer"
                    className="border border-[#d0d7de] p-3 rounded hover:bg-[#eaeef2] block text-left"
                  >
                    <span className="text-blue-600 font-bold block">techfiesta_mentalhealth (Nivana)</span>
                    <span className="text-gray-500 block mt-1">Privacy-first AI mental health SPA with local/cloud RAG model retrieval.</span>
                  </a>
                  <a
                    href="https://github.com/Atharva2026/LinkedIN_GENAI_PostGenerator"
                    target="_blank"
                    rel="noreferrer"
                    className="border border-[#d0d7de] p-3 rounded hover:bg-[#eaeef2] block text-left"
                  >
                    <span className="text-blue-600 font-bold block">LinkedIN_GENAI_PostGenerator</span>
                    <span className="text-gray-500 block mt-1">Streamlit tool generating custom LinkedIn posts from live Tavily searches.</span>
                  </a>
                  <a
                    href="https://github.com/Atharva2026/website-"
                    target="_blank"
                    rel="noreferrer"
                    className="border border-[#d0d7de] p-3 rounded hover:bg-[#eaeef2] block text-left"
                  >
                    <span className="text-blue-600 font-bold block">website- (Ethicraft Club)</span>
                    <span className="text-gray-500 block mt-1">Official Next.js portal containing student/admin dashboard with payment portals.</span>
                  </a>
                </div>
              </div>

              <div className="flex gap-2">
                <XPButton onClick={() => window.open('https://github.com/Atharva2026', '_blank')} size="sm">
                  Open in New Tab
                </XPButton>
                <XPButton onClick={() => navigateTo('msn-home')} size="sm" variant="primary">
                  Go to IE Homepage
                </XPButton>
              </div>
            </div>
          ) : (
            <div className="space-y-4 font-serif">
              {/* MSN-style portal homepage */}
              <div className="flex items-center justify-between border-b-4 border-blue-800 pb-2">
                <h1 className="text-3xl font-extrabold text-blue-900 italic tracking-tight font-sans">
                  msn<span className="text-red-600 font-normal">.</span>com
                </h1>
                <span className="text-xs text-gray-500 font-sans">Today's Date: July 14, 2026</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                <div className="md:col-span-2 space-y-3">
                  <div className="bg-[#fff9e6] border-2 border-[#ffcc00] p-3 rounded">
                    <h2 className="font-bold text-red-700 text-sm">🔥 BREAKING: Atharva launches new XP Portfolio</h2>
                    <p className="mt-1 text-gray-700">
                      AI Engineer and Full-Stack Developer Atharva Shah deploys a fully functional retro Windows XP explorer portfolio. Click links below to explore deployed web projects!
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-sm text-blue-900 border-b border-gray-300 pb-1">🚀 Live Project Demos</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 border rounded bg-gray-50">
                        <span className="font-bold block text-blue-700">Globe Express</span>
                        <a href="https://globe-express.onrender.com/" target="_blank" rel="noreferrer" className="text-xs text-green-700 hover:underline block truncate">
                          globe-express.onrender.com
                        </a>
                      </div>
                      <div className="p-2 border rounded bg-gray-50">
                        <span className="font-bold block text-blue-700">Nivana Platform</span>
                        <a href="https://nivana-azure.vercel.app/" target="_blank" rel="noreferrer" className="text-xs text-green-700 hover:underline block truncate">
                          nivana-azure.vercel.app
                        </a>
                      </div>
                      <div className="p-2 border rounded bg-gray-50">
                        <span className="font-bold block text-blue-700">LinkedIn GenAI</span>
                        <a href="https://linkedingenaipostgenerator-n9zkj2o8riskrjx26edfan.streamlit.app/" target="_blank" rel="noreferrer" className="text-xs text-green-700 hover:underline block truncate">
                          streamlit.app/LinkedInGenAI
                        </a>
                      </div>
                      <div className="p-2 border rounded bg-gray-50">
                        <span className="font-bold block text-blue-700">Ethicraft Website</span>
                        <a href="https://ethicraft.vercel.app" target="_blank" rel="noreferrer" className="text-xs text-green-700 hover:underline block truncate">
                          ethicraft.vercel.app
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 bg-[#eef3f9] p-3 border border-blue-200 rounded">
                  <h3 className="font-bold text-blue-900 border-b border-blue-300 pb-1">👤 Contact & Socials</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => navigateTo('https://github.com/Atharva2026')}
                      className="w-full text-left text-blue-700 hover:underline font-bold block"
                    >
                      🐙 GitHub Profile
                    </button>
                    <a href="https://www.linkedin.com/in/atharva-shah-915a86324/" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline font-bold block">
                      🔗 LinkedIn Profile
                    </a>
                    <a href="mailto:shahatharva20@gmail.com" className="text-blue-700 hover:underline font-bold block">
                      📧 Email Atharva
                    </a>
                    <a href="/RESUME_MARCH.pdf" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline font-bold block">
                      📄 View Resume PDF
                    </a>
                  </div>

                  <div className="border-t border-blue-300 pt-2 text-[10px] text-gray-500">
                    <p>Designed with nostalgic Windows XP styling using React & Tailwind.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="bg-[#ece9d8] text-[11px] text-gray-600 px-2 py-0.5 border-t border-[#aca899] flex justify-between select-none">
          <span>Done</span>
          <span className="flex items-center gap-1 pr-4">
            🛡️ Local intranet | Protected Mode: Off
          </span>
        </div>
      </div>
    </XPWindow>
  );
}
