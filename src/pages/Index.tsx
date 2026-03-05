import { useState, useCallback } from 'react';
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
import { Project, Skill, projects, skills } from '@/data/searchData';
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
  type: 'project' | 'about' | 'skill' | 'search' | 'projects-folder' | 'my-computer';
  data: any;
  isMinimized: boolean;
}

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

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
      default:
        return 'Window';
    }
  };

  return (
    <>
      {/* Lock Screen */}
      <AnimatePresence>
        {!isLoggedIn && <LockScreen onLogin={() => setIsLoggedIn(true)} />}
      </AnimatePresence>

      {/* Desktop */}
      <div
        className="min-h-screen relative overflow-hidden"
        style={{
          backgroundImage: `url(${blissWallpaper})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Desktop Icons - Left Side Column (XP style grid layout) */}
        <div className="absolute top-2 left-2 grid grid-cols-1 gap-0 z-10" style={{ maxHeight: 'calc(100vh - 50px)' }}>
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
            onClick={() => window.open('https://github.com/atharva', '_blank')}
          />
          <DesktopIcon
            icon={<img src={resumeIcon} alt="Resume" className="w-12 h-12 drop-shadow-lg" />}
            label="Resume.pdf"
            onClick={() => window.open('/RESUME_MARCH.pdf', '_blank')}
          />
          <DesktopIcon
            icon={<img src={searchIcon} alt="Search" className="w-12 h-12 drop-shadow-lg" />}
            label="Search"
            onClick={() => openWindow('search', null, 'search-main')}
          />
          <DesktopIcon
            icon={<img src={skillsIcon} alt="Skills" className="w-12 h-12 drop-shadow-lg" />}
            label="Skills"
            onClick={() => openWindow('skill', null, 'skills-main')}
          />
          <DesktopIcon
            icon={<img src={recycleBinIcon} alt="Recycle Bin" className="w-12 h-12 drop-shadow-lg" />}
            label="Recycle Bin"
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

            return null;
          })}
        </AnimatePresence>

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
      <div className="p-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => {
                if (project.liveUrl && project.liveUrl !== 'https://paste-your-link-here.com') {
                  window.open(project.liveUrl, '_blank');
                } else {
                  // Fallback for placeholder
                  onOpenProject(project);
                }
              }}
              className="flex flex-col items-center gap-1 p-2 rounded hover:bg-primary/10 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center">
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
