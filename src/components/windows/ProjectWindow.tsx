import { ExternalLink, Github, Calendar, User, Tag, FolderOpen } from 'lucide-react';
import { Project } from '@/data/searchData';
import { XPWindow } from '@/components/xp/XPWindow';
import { XPButton } from '@/components/xp/XPButton';
import { XPIcon } from '@/components/xp/XPIcon';

interface ProjectWindowProps {
  project: Project;
  onClose: () => void;
  onMinimize: () => void;
  isActive?: boolean;
}

export function ProjectWindow({ project, onClose, onMinimize, isActive }: ProjectWindowProps) {
  return (
    <XPWindow
      title={project.title}
      onClose={onClose}
      onMinimize={onMinimize}
      isActive={isActive}
      icon={<FolderOpen className="w-4 h-4 text-yellow-500" />}
      className="w-full max-w-2xl"
    >
      <div className="p-4 space-y-4">
        {/* Hero placeholder */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded border-2 border-border h-40 flex items-center justify-center">
          <XPIcon name="monitor" size="lg" />
        </div>
        
        {/* Summary */}
        <div>
          <h2 className="font-retro text-xl text-primary mb-2">{project.title}</h2>
          <p className="text-sm text-foreground font-sans leading-relaxed">
            {project.description}
          </p>
        </div>
        
        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground font-sans">
            <User className="w-4 h-4" />
            <span>{project.role}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground font-sans">
            <Calendar className="w-4 h-4" />
            <span>{project.startDate} - {project.endDate}</span>
          </div>
        </div>
        
        {/* Technologies */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium font-sans">Technologies</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-muted text-xs font-sans rounded border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-border">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <XPButton variant="primary" size="sm">
                <span className="flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" />
                  View Live
                </span>
              </XPButton>
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <XPButton size="sm">
                <span className="flex items-center gap-1">
                  <Github className="w-3 h-3" />
                  GitHub
                </span>
              </XPButton>
            </a>
          )}
        </div>
      </div>
    </XPWindow>
  );
}
