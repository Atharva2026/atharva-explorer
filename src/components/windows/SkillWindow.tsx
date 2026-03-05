import { Code, Star, Award, ExternalLink } from 'lucide-react';
import { skills, certificates } from '@/data/searchData';
import { XPWindow } from '@/components/xp/XPWindow';

interface SkillWindowProps {
  skill?: any;
  onClose: () => void;
  onMinimize: () => void;
  isActive?: boolean;
}

const levelStars = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
};

const levelColors = {
  beginner: 'bg-gray-200 text-gray-700',
  intermediate: 'bg-blue-100 text-blue-700',
  advanced: 'bg-green-100 text-green-700',
  expert: 'bg-amber-100 text-amber-700',
};

export function SkillWindow({ onClose, onMinimize, isActive }: SkillWindowProps) {
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <XPWindow
      title="Skills & Certificates"
      onClose={onClose}
      onMinimize={onMinimize}
      isActive={isActive}
      icon={<Code className="w-4 h-4 text-green-600" />}
      className="w-full max-w-2xl"
      defaultPosition={{ x: 120, y: 60 }}
    >
      <div className="bg-white max-h-[70vh] overflow-y-auto">
        {/* Skills Section */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Code className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-sm text-gray-800">Technical Skills</h2>
          </div>
          
          {/* XP-style Table */}
          <div className="border border-gray-300">
            {/* Table Header */}
            <div 
              className="grid grid-cols-[140px_100px_80px_1fr] text-xs font-bold text-gray-700 border-b border-gray-300"
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #ece9d8 100%)',
              }}
            >
              <div className="px-2 py-1.5 border-r border-gray-300">Skill</div>
              <div className="px-2 py-1.5 border-r border-gray-300">Category</div>
              <div className="px-2 py-1.5 border-r border-gray-300">Level</div>
              <div className="px-2 py-1.5">Description</div>
            </div>
            
            {/* Table Body */}
            {skills.map((skill, index) => (
              <div 
                key={skill.id}
                className={`grid grid-cols-[140px_100px_80px_1fr] text-xs ${
                  index % 2 === 0 ? 'bg-white' : 'bg-[#f5f5f5]'
                } hover:bg-[#316ac5] hover:text-white group`}
              >
                <div className="px-2 py-1.5 border-r border-gray-200 font-medium flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-sm flex items-center justify-center">
                    <Code className="w-2.5 h-2.5 text-white" />
                  </div>
                  {skill.name}
                </div>
                <div className="px-2 py-1.5 border-r border-gray-200 text-gray-600 group-hover:text-white/80">
                  {skill.category}
                </div>
                <div className="px-2 py-1.5 border-r border-gray-200">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < levelStars[skill.level] 
                            ? 'text-amber-500 fill-amber-500 group-hover:text-amber-300 group-hover:fill-amber-300' 
                            : 'text-gray-300 group-hover:text-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="px-2 py-1.5 text-gray-600 group-hover:text-white/80">
                  {skill.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div className="p-3">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-amber-600" />
            <h2 className="font-bold text-sm text-gray-800">Certificates & Credentials</h2>
          </div>
          
          {/* Certificates Table */}
          <div className="border border-gray-300">
            {/* Table Header */}
            <div 
              className="grid grid-cols-[1fr_140px_80px_60px] text-xs font-bold text-gray-700 border-b border-gray-300"
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #ece9d8 100%)',
              }}
            >
              <div className="px-2 py-1.5 border-r border-gray-300">Certificate</div>
              <div className="px-2 py-1.5 border-r border-gray-300">Issuer</div>
              <div className="px-2 py-1.5 border-r border-gray-300">Date</div>
              <div className="px-2 py-1.5">Link</div>
            </div>
            
            {/* Table Body */}
            {certificates.map((cert, index) => (
              <div 
                key={cert.id}
                className={`grid grid-cols-[1fr_140px_80px_60px] text-xs ${
                  index % 2 === 0 ? 'bg-white' : 'bg-[#f5f5f5]'
                } hover:bg-[#316ac5] hover:text-white group`}
              >
                <div className="px-2 py-1.5 border-r border-gray-200 font-medium flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-sm flex items-center justify-center">
                    <Award className="w-2.5 h-2.5 text-white" />
                  </div>
                  {cert.name}
                </div>
                <div className="px-2 py-1.5 border-r border-gray-200 text-gray-600 group-hover:text-white/80">
                  {cert.issuer}
                </div>
                <div className="px-2 py-1.5 border-r border-gray-200 text-gray-600 group-hover:text-white/80">
                  {cert.date}
                </div>
                <div className="px-2 py-1.5">
                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 group-hover:text-white flex items-center gap-0.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3 h-3" />
                      View
                    </a>
                  ) : (
                    <span className="text-gray-400 group-hover:text-white/50">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="px-3 pb-3">
          <div className="flex items-center gap-4 text-[10px] text-gray-500 border-t border-gray-200 pt-2">
            <span className="font-medium">Skill Levels:</span>
            <div className="flex items-center gap-1">
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <span>Beginner</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <span>Intermediate</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <span>Advanced</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <span>Expert</span>
            </div>
          </div>
        </div>
      </div>
    </XPWindow>
  );
}