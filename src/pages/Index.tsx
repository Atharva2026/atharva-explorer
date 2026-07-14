import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen } from 'lucide-react';
import { DesktopIcon } from '@/components/xp/DesktopIcon';
import { Taskbar } from '@/components/xp/Taskbar';
import { LockScreen } from '@/components/xp/LockScreen';
import { ProjectWindow } from '@/components/windows/ProjectWindow';
import { AboutWindow } from '@/components/windows/AboutWindow';
import { SkillWindow } from '@/components/windows/SkillWindow';
import { SearchWindow } from '@/components/windows/SearchWindow';
import { MyComputerWindow } from '@/components/windows/MyComputerWindow';
import { InternetExplorerWindow } from '@/components/windows/InternetExplorerWindow';
import { ControlPanelWindow } from '@/components/windows/ControlPanelWindow';
import { CmdWindow } from '@/components/windows/CmdWindow';
import { CalcWindow } from '@/components/windows/CalcWindow';
import { RunWindow } from '@/components/windows/RunWindow';
import { RecycleBinWindow } from '@/components/windows/RecycleBinWindow';
import { MsnMessengerWindow } from '@/components/windows/MsnMessengerWindow';
import { MinesweeperWindow } from '@/components/windows/MinesweeperWindow';
import { WinampWindow } from '@/components/windows/WinampWindow';
import { ClippyAssistant } from '@/components/xp/ClippyAssistant';
import { BalloonNotification, BalloonTip } from '@/components/xp/BalloonNotification';
import { Project, Skill, projects, skills } from '@/data/searchData';
import { setAudioEnabled, playStartupChime, playRecycleBin } from '@/lib/audioEngine';
import blissWallpaper from '@/assets/bliss.png';

// Import XP-style icons
import myComputerIcon from '@/assets/icons/my-computer.png';
import myProjectsIcon from '@/assets/icons/my-projects.png';
import aboutMeIcon from '@/assets/icons/about-me.png';
import internetIcon from '@/assets/icons/internet.png';
import resumeIcon from '@/assets/icons/resume.png';
import searchIcon from '@/assets/icons/search.png';
import skillsIcon from '@/assets/icons/skills.png';
import recycleBinIcon from '@/assets/icons/recycle-bin.png';

interface OpenWindow {
  id: string;
  type: 'project' | 'about' | 'skill' | 'search' | 'projects-folder' | 'my-computer' | 'internet-explorer' | 'calculator' | 'control-panel' | 'cmd' | 'run' | 'recycle-bin' | 'msn' | 'minesweeper' | 'winamp';
  data: any;
  isMinimized: boolean;
}

const MsnIcon = () => (
  <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-md">
    {/* Blue Buddy figure */}
    <circle cx="17" cy="17" r="7" fill="#0080ff" />
    <path d="M 17 26 C 9 26, 4 31, 4 39 L 30 39 C 30 31, 25 26, 17 26 Z" fill="#0080ff" />
    {/* Green Buddy figure */}
    <circle cx="29" cy="14" r="7" fill="#00cc44" />
    <path d="M 29 23 C 21 23, 17 28, 17 35 L 41 35 C 41 28, 37 23, 29 23 Z" fill="#00cc44" />
  </svg>
);

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Atharva');
  const [wallpaper, setWallpaper] = useState('bliss');
  const [isRecycleBinEmpty, setIsRecycleBinEmpty] = useState(false);
  const [isShutdown, setIsShutdown] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [activeBalloon, setActiveBalloon] = useState<BalloonTip | null>(null);
  const [isClippyVisible, setIsClippyVisible] = useState(true);

  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  // Sync sound toggle to Audio Engine
  const handleToggleAudio = useCallback(() => {
    const nextState = !isAudioOn;
    setIsAudioOn(nextState);
    setAudioEnabled(nextState);
    if (nextState) {
      playStartupChime();
    }
  }, [isAudioOn]);

  const openWindow = useCallback((type: OpenWindow['type'], data: any = null, customId?: string) => {
    const windowId = customId || `${type}-${Date.now()}`;

    const existingWindow = openWindows.find((w) => w.id === windowId);
    if (existingWindow) {
      setOpenWindows((prev) =>
        prev.map((w) => (w.id === windowId ? { ...w, isMinimized: false } : w))
      );
      setActiveWindowId(windowId);
      return;
    }

    setOpenWindows((prev) => [
      ...prev,
      { id: windowId, type, data, isMinimized: false },
    ]);
    setActiveWindowId(windowId);
  }, [openWindows]);

  const handleCloseWindow = useCallback((windowId: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== windowId));
    if (activeWindowId === windowId) {
      const remaining = openWindows.filter((w) => w.id !== windowId);
      setActiveWindowId(remaining.length > 0 ? remaining[remaining.length - 1].id : null);
    }
  }, [openWindows, activeWindowId]);

  const handleMinimizeWindow = useCallback((windowId: string) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, isMinimized: true } : w))
    );
  }, []);

  const handleTaskbarClick = useCallback((windowId: string) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, isMinimized: !w.isMinimized } : w))
    );
    setActiveWindowId(windowId);
  }, []);

  const handleRunCommand = useCallback((cmdStr: string) => {
    const cmd = cmdStr.toLowerCase().trim();
    if (cmd === 'cmd' || cmd === 'command') {
      openWindow('cmd', null, 'cmd-terminal');
    } else if (cmd === 'calc' || cmd === 'calculator') {
      openWindow('calculator', null, 'calculator-main');
    } else if (cmd === 'notepad' || cmd === 'about') {
      openWindow('about', null, 'about-main');
    } else if (cmd === 'iexplore' || cmd === 'ie' || cmd === 'internet') {
      openWindow('internet-explorer', null, 'internet-explorer');
    } else if (cmd === 'control' || cmd === 'control panel') {
      openWindow('control-panel', null, 'control-panel');
    } else if (cmd === 'msn' || cmd === 'messenger' || cmd === 'chat') {
      openWindow('msn', null, 'msn-chat');
    } else if (cmd === 'mines' || cmd === 'minesweeper') {
      openWindow('minesweeper', null, 'minesweeper-game');
    } else if (cmd === 'winamp' || cmd === 'music' || cmd === 'player') {
      openWindow('winamp', null, 'winamp-player');
    } else if (cmd === 'github' || cmd === 'git') {
      window.open('https://github.com/Atharva2026', '_blank');
    } else if (cmd === 'linkedin') {
      window.open('https://www.linkedin.com/in/atharva-shah-915a86324/', '_blank');
    } else {
      alert(`Windows cannot find '${cmdStr}'. Make sure you typed the name correctly, and then try again.`);
    }
  }, [openWindow]);

  const handleStartMenuAction = useCallback((action: string) => {
    switch (action) {
      case 'search':
        openWindow('search', null, 'search-main');
        break;
      case 'projects':
        openWindow('projects-folder', null, 'projects-folder');
        break;
      case 'about':
        openWindow('about', null, 'about-main');
        break;
      case 'internet':
        openWindow('internet-explorer', null, 'internet-explorer');
        break;
      case 'email':
        window.open('mailto:shahatharva20@gmail.com');
        break;
      case 'resume':
        window.open('/RESUME_MARCH.pdf', '_blank');
        break;
      case 'documents':
      case 'pictures':
      case 'music':
        alert(`The ${action} folder is empty.`);
        break;
      case 'computer':
        openWindow('my-computer', null, 'my-computer');
        break;
      case 'control-panel':
        openWindow('control-panel', null, 'control-panel');
        break;
      case 'printers':
        alert('Printers: No printers installed on this computer.');
        break;
      case 'help':
        alert('Help and Support is currently offline. Please contact shahatharva20@gmail.com for help.');
        break;
      case 'run':
        openWindow('run', null, 'run-dialog');
        break;
      case 'logoff':
        setIsLoggedIn(false);
        break;
      case 'shutdown':
        setIsShutdown(true);
        break;
      default:
        break;
    }
  }, [openWindow]);

  const handleOpenProject = useCallback((project: Project) => {
    openWindow('project', project, `project-${project.id}`);
  }, [openWindow]);

  const handleOpenSkill = useCallback((skill: Skill) => {
    openWindow('skill', skill, `skill-${skill.id}`);
  }, [openWindow]);

  const handleOpenAbout = useCallback(() => {
    openWindow('about', null, 'about-main');
  }, [openWindow]);

  const handleMyComputerFolder = useCallback((folderId: string) => {
    switch (folderId) {
      case 'projects':
        openWindow('projects-folder', null, 'projects-folder');
        break;
      case 'about':
        openWindow('about', null, 'about-main');
        break;
      case 'skills':
        openWindow('skill', null, 'skills-main');
        break;
    }
  }, [openWindow]);

  const getWindowTitle = (window: OpenWindow) => {
    switch (window.type) {
      case 'project':
        return (window.data as Project)?.title || 'Project';
      case 'skill':
        return (window.data as Skill)?.name || 'Skill';
      case 'about':
        return 'About Me';
      case 'search':
        return 'Search';
      case 'projects-folder':
        return 'My Projects';
      case 'my-computer':
        return 'My Computer';
      case 'internet-explorer':
        return 'Internet Explorer';
      case 'control-panel':
        return 'Control Panel';
      case 'cmd':
        return 'cmd.exe';
      case 'calculator':
        return 'Calculator';
      case 'run':
        return 'Run';
      case 'recycle-bin':
        return 'Recycle Bin';
      case 'msn':
        return 'MSN Messenger';
      case 'minesweeper':
        return 'Minesweeper';
      case 'winamp':
        return 'Winamp';
      default:
        return 'Window';
    }
  };

  const handleEmptyRecycleBin = () => {
    setIsRecycleBinEmpty(true);
    if (isAudioOn) {
      playRecycleBin();
    }
  };

  const handleNetworkTrayClick = () => {
    alert(
      "Local Area Connection Details:\n\n" +
      "Status: Connected (100.0 Mbps)\n" +
      "IP Address: 127.0.0.1\n" +
      "Pings:\n" +
      " - GitHub: Active (github.com/Atharva2026)\n" +
      " - LinkedIn: Active\n" +
      " - Resume Server: Active"
    );
  };

  // Notification balloon click actions
  const handleBalloonAction = (actionKey: string) => {
    if (actionKey === 'open-projects') {
      openWindow('projects-folder', null, 'projects-folder');
    } else if (actionKey === 'open-github') {
      window.open('https://github.com/Atharva2026', '_blank');
    } else if (actionKey === 'open-msn') {
      openWindow('msn', null, 'msn-chat');
    }
  };

  // Welcome sound triggers
  useEffect(() => {
    if (isLoggedIn && isAudioOn) {
      setTimeout(() => {
        playStartupChime();
      }, 500);
    }
  }, [isLoggedIn, isAudioOn]);

  // Balloon Tip Timers flow
  useEffect(() => {
    if (!isLoggedIn) return;

    // Welcome tip
    const t1 = setTimeout(() => {
      setActiveBalloon({
        id: 'welcome',
        title: 'Welcome to AtharvaXP!',
        message: 'Atharva Shah\'s retro developer workstation is loaded. Click here to check his portfolio projects!',
        type: 'info',
        actionKey: 'open-projects',
        duration: 9000
      });
    }, 3000);

    // Gag updates warning
    const t2 = setTimeout(() => {
      setActiveBalloon({
        id: 'coffee',
        title: 'Security Alert - Coffee Low',
        message: 'Developer fuel levels are low. Click here to check GitHub commits logs to refuel!',
        type: 'warning',
        actionKey: 'open-github',
        duration: 8000
      });
    }, 18000);

    // MSN contact notification
    const t3 = setTimeout(() => {
      setActiveBalloon({
        id: 'msn-msg',
        title: 'New Message from Atharva',
        message: 'Hey! Want to collaborate or hire me? Click to chat in MSN Messenger!',
        type: 'info',
        actionKey: 'open-msn',
        duration: 9000
      });
    }, 60000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isLoggedIn]);

  if (isShutdown) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-[#ff6b35] select-none p-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-xl font-bold uppercase tracking-widest border-b border-[#ff6b35] pb-2">
            System Shutdown
          </h1>
          <p className="text-sm">
            It is now safe to turn off your computer.
          </p>
          <div className="pt-4">
            <button
              onClick={() => {
                setIsShutdown(false);
                setIsLoggedIn(false);
              }}
              className="px-4 py-2 border border-[#ff6b35] hover:bg-[#ff6b35] hover:text-black font-bold transition-colors text-xs"
            >
              RESTART ATHARVA-XP
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Lock Screen */}
      <AnimatePresence>
        {!isLoggedIn && <LockScreen onLogin={() => setIsLoggedIn(true)} userName={userName} />}
      </AnimatePresence>

      {/* Desktop */}
      <div
        className="min-h-screen relative overflow-hidden"
        style={
          wallpaper === 'bliss'
            ? {
                backgroundImage: `url(${blissWallpaper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : wallpaper === 'solid-blue'
            ? { backgroundColor: '#3a6ea5' }
            : wallpaper === 'solid-olive'
            ? { backgroundColor: '#4c5b36' }
            : wallpaper === 'solid-silver'
            ? { backgroundColor: '#aca899' }
            : {
                background: 'linear-gradient(135deg, #2c003e 0%, #03001e 50%, #730068 100%)',
              }
        }
      >
        {/* Desktop Icons - Column 1 */}
        <div className="absolute top-2 left-2 flex flex-col gap-0 z-10" style={{ maxHeight: 'calc(100vh - 50px)' }}>
          <DesktopIcon
            icon={<img src={myComputerIcon} alt="My Computer" className="w-12 h-12 drop-shadow-lg" />}
            label="My Computer"
            onClick={() => openWindow('my-computer', null, 'my-computer')}
          />
          <DesktopIcon
            icon={<img src={myProjectsIcon} alt="My Projects" className="w-12 h-12 drop-shadow-lg" />}
            label="My Projects"
            onClick={() => openWindow('projects-folder', null, 'projects-folder')}
          />
          <DesktopIcon
            icon={<img src={aboutMeIcon} alt="About Me" className="w-12 h-12 drop-shadow-lg" />}
            label="About Me"
            onClick={() => openWindow('about', null, 'about-main')}
          />
          <DesktopIcon
            icon={<img src={internetIcon} alt="Internet" className="w-12 h-12 drop-shadow-lg" />}
            label="Internet Explorer"
            onClick={() => openWindow('internet-explorer', null, 'internet-explorer')}
          />
          <DesktopIcon
            icon={<img src={resumeIcon} alt="Resume" className="w-12 h-12 drop-shadow-lg" />}
            label="Resume.pdf"
            onClick={() => window.open('/RESUME_MARCH.pdf', '_blank')}
          />
          <DesktopIcon
            icon={<img src={recycleBinIcon} alt="Recycle Bin" className="w-12 h-12 drop-shadow-lg" />}
            label="Recycle Bin"
            onClick={() => openWindow('recycle-bin', null, 'recycle-bin')}
          />
        </div>

        {/* Desktop Icons - Column 2 */}
        <div className="absolute top-2 left-24 flex flex-col gap-0 z-10" style={{ maxHeight: 'calc(100vh - 50px)' }}>
          <DesktopIcon
            icon={<MsnIcon />}
            label="MSN Messenger"
            onClick={() => openWindow('msn', null, 'msn-chat')}
          />
          <DesktopIcon
            icon={<img src={skillsIcon} alt="Skills" className="w-12 h-12 drop-shadow-lg" />}
            label="Skills"
            onClick={() => openWindow('skill', null, 'skills-main')}
          />
          <DesktopIcon
            icon={<img src={searchIcon} alt="Search" className="w-12 h-12 drop-shadow-lg" />}
            label="Search"
            onClick={() => openWindow('search', null, 'search-main')}
          />
        </div>

        {/* Windows */}
        <AnimatePresence>
          {openWindows.map((window) => {
            if (window.isMinimized) return null;

            const isActive = activeWindowId === window.id;

            if (window.type === 'project') {
              return (
                <ProjectWindow
                  key={window.id}
                  project={window.data as Project}
                  onClose={() => handleCloseWindow(window.id)}
                  onMinimize={() => handleMinimizeWindow(window.id)}
                  isActive={isActive}
                />
              );
            }

            if (window.type === 'about') {
              return (
                <AboutWindow
                  key={window.id}
                  onClose={() => handleCloseWindow(window.id)}
                  onMinimize={() => handleMinimizeWindow(window.id)}
                  isActive={isActive}
                />
              );
            }

            if (window.type === 'skill') {
              return (
                <SkillWindow
                  key={window.id}
                  onClose={() => handleCloseWindow(window.id)}
                  onMinimize={() => handleMinimizeWindow(window.id)}
                  isActive={isActive}
                />
              );
            }

            if (window.type === 'search') {
              return (
                <SearchWindow
                  key={window.id}
                  onClose={() => handleCloseWindow(window.id)}
                  onMinimize={() => handleMinimizeWindow(window.id)}
                  onOpenProject={handleOpenProject}
                  onOpenSkill={handleOpenSkill}
                  onOpenAbout={handleOpenAbout}
                  isActive={isActive}
                />
              );
            }

            if (window.type === 'projects-folder') {
              return (
                <ProjectsFolderWindow
                  key={window.id}
                  projects={projects}
                  onClose={() => handleCloseWindow(window.id)}
                  onMinimize={() => handleMinimizeWindow(window.id)}
                  onOpenProject={handleOpenProject}
                  isActive={isActive}
                />
              );
            }

            if (window.type === 'my-computer') {
              return (
                <MyComputerWindow
                  key={window.id}
                  onClose={() => handleCloseWindow(window.id)}
                  onMinimize={() => handleMinimizeWindow(window.id)}
                  onOpenFolder={handleMyComputerFolder}
                  isActive={isActive}
                />
              );
            }

            if (window.type === 'internet-explorer') {
              return (
                <InternetExplorerWindow
                  key={window.id}
                  onClose={() => handleCloseWindow(window.id)}
                  onMinimize={() => handleMinimizeWindow(window.id)}
                  isActive={isActive}
                />
              );
            }

            if (window.type === 'control-panel') {
              return (
                <ControlPanelWindow
                  key={window.id}
                  onClose={() => handleCloseWindow(window.id)}
                  onMinimize={() => handleMinimizeWindow(window.id)}
                  isActive={isActive}
                  currentWallpaper={wallpaper}
                  setWallpaper={setWallpaper}
                  userName={userName}
                  setUserName={setUserName}
                />
              );
            }

            if (window.type === 'cmd') {
              return (
                <CmdWindow
                  key={window.id}
                  onClose={() => handleCloseWindow(window.id)}
                  onMinimize={() => handleMinimizeWindow(window.id)}
                  isActive={isActive}
                  onOpenWindow={(t) => openWindow(t, null, t === 'internet-explorer' ? 'internet-explorer' : undefined)}
                />
              );
            }

            if (window.type === 'calculator') {
              return (
                <CalcWindow
                  key={window.id}
                  onClose={() => handleCloseWindow(window.id)}
                  onMinimize={() => handleMinimizeWindow(window.id)}
                  isActive={isActive}
                />
              );
            }

            if (window.type === 'run') {
              return (
                <RunWindow
                  key={window.id}
                  onClose={() => handleCloseWindow(window.id)}
                  onMinimize={() => handleMinimizeWindow(window.id)}
                  isActive={isActive}
                  onRunCommand={handleRunCommand}
                />
              );
            }

            if (window.type === 'recycle-bin') {
              return (
                <RecycleBinWindow
                  key={window.id}
                  onClose={() => handleCloseWindow(window.id)}
                  onMinimize={() => handleMinimizeWindow(window.id)}
                  isActive={isActive}
                  isEmpty={isRecycleBinEmpty}
                  onEmptyBin={handleEmptyRecycleBin}
                />
              );
            }

            if (window.type === 'msn') {
              return (
                <MsnMessengerWindow
                  key={window.id}
                  onClose={() => handleCloseWindow(window.id)}
                  onMinimize={() => handleMinimizeWindow(window.id)}
                  isActive={isActive}
                />
              );
            }

            if (window.type === 'minesweeper') {
              return (
                <MinesweeperWindow
                  key={window.id}
                  onClose={() => handleCloseWindow(window.id)}
                  onMinimize={() => handleMinimizeWindow(window.id)}
                  isActive={isActive}
                />
              );
            }

            if (window.type === 'winamp') {
              return (
                <WinampWindow
                  key={window.id}
                  onClose={() => handleCloseWindow(window.id)}
                  onMinimize={() => handleMinimizeWindow(window.id)}
                  isActive={isActive}
                />
              );
            }

            return null;
          })}
        </AnimatePresence>

        {/* Clippy Assistant */}
        <ClippyAssistant 
          isVisible={isClippyVisible} 
          onClose={() => setIsClippyVisible(false)}
          onOpenWindow={(t) => openWindow(t, null, t === 'internet-explorer' ? 'internet-explorer' : undefined)} 
        />

        {/* Balloon Notifications */}
        <BalloonNotification
          notification={activeBalloon}
          onClose={() => setActiveBalloon(null)}
          onClickAction={handleBalloonAction}
        />

        {/* Taskbar */}
        <Taskbar
          windows={openWindows.map((w) => ({
            id: w.id,
            title: getWindowTitle(w),
            isMinimized: w.isMinimized,
          }))}
          activeWindowId={activeWindowId}
          onWindowClick={handleTaskbarClick}
          onStartMenuAction={handleStartMenuAction}
          userName={userName}
          isAudioOn={isAudioOn}
          onToggleAudio={handleToggleAudio}
          onNetworkClick={handleNetworkTrayClick}
          isClippyActive={isClippyVisible}
          onToggleClippy={() => setIsClippyVisible(!isClippyVisible)}
        />
      </div>
    </>
  );
};

// Projects Folder Window Component
import { XPWindow } from '@/components/xp/XPWindow';

interface ProjectsFolderWindowProps {
  projects: Project[];
  onClose: () => void;
  onMinimize: () => void;
  onOpenProject: (project: Project) => void;
  isActive?: boolean;
}

function ProjectsFolderWindow({ projects, onClose, onMinimize, onOpenProject, isActive }: ProjectsFolderWindowProps) {
  return (
    <XPWindow
      title="My Projects"
      onClose={onClose}
      onMinimize={onMinimize}
      isActive={isActive}
      icon={<FolderOpen className="w-4 h-4 text-yellow-500" />}
      defaultPosition={{ x: 150, y: 80 }}
    >
      <div className="p-4 bg-white font-sans text-xs">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => {
                onOpenProject(project);
              }}
              className="flex flex-col items-center gap-1 p-2 rounded hover:bg-primary/10 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center shadow-sm">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-center font-sans text-foreground group-hover:text-primary line-clamp-2">
                {project.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </XPWindow>
  );
}

export default Index;
