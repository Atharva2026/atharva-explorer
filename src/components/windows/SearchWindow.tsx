import { useState } from 'react';
import { Search } from 'lucide-react';
import { XPWindow } from '@/components/xp/XPWindow';
import { useSearch, SearchResult } from '@/hooks/useSearch';
import { Project, Skill } from '@/data/searchData';

interface SearchWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  onOpenProject: (project: Project) => void;
  onOpenSkill: (skill: Skill) => void;
  isActive?: boolean;
}

export function SearchWindow({ onClose, onMinimize, onOpenProject, onOpenSkill, isActive }: SearchWindowProps) {
  const [inputValue, setInputValue] = useState('');
  const { results, search, query } = useSearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search(inputValue);
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'project') {
      onOpenProject(result.item as Project);
    } else if (result.type === 'skill') {
      onOpenSkill(result.item as Skill);
    }
  };

  return (
    <XPWindow
      title="Search Results"
      onClose={onClose}
      onMinimize={onMinimize}
      isActive={isActive}
      icon={<Search className="w-4 h-4 text-yellow-600" />}
      defaultPosition={{ x: 120, y: 60 }}
    >
      <div className="p-4 min-w-[400px]">
        {/* Search Input */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search projects, skills, or about me..."
              className="xp-input flex-1 text-sm"
              autoFocus
            />
            <button type="submit" className="xp-button flex items-center gap-1">
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </form>

        {/* Quick Suggestions */}
        {!query && (
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">Try searching for:</p>
            <div className="flex flex-wrap gap-2">
              {['projects', 'machine learning', 'react', 'about me'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInputValue(suggestion);
                    search(suggestion);
                  }}
                  className="px-2 py-1 text-xs bg-muted hover:bg-primary hover:text-primary-foreground rounded transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground mb-2">
              {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </p>
            
            {results.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No results found. Try a different search term.
              </p>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {results.map((result, index) => {
                  const title = result.type === 'skill' 
                    ? (result.item as Skill).name 
                    : 'title' in result.item 
                      ? result.item.title 
                      : '';
                  const description = result.type === 'skill'
                    ? (result.item as Skill).category
                    : 'description' in result.item
                      ? result.item.description
                      : '';
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleResultClick(result)}
                      className="w-full text-left p-2 hover:bg-muted rounded group"
                    >
                      <span className="xp-link text-sm font-medium block">
                        {title}
                      </span>
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {description}
                      </span>
                      <span className="text-xs text-green-600 capitalize">
                        {result.type}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </XPWindow>
  );
}
