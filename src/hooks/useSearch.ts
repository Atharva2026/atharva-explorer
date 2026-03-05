import { useState, useMemo, useCallback } from 'react';
import Fuse from 'fuse.js';
import { projects, skills, aboutItems, Project, Skill, AboutItem } from '@/data/searchData';

export type SearchCategory = 'all' | 'projects' | 'skills' | 'about';

export interface SearchResult {
  item: Project | Skill | AboutItem;
  type: 'project' | 'skill' | 'about';
  score: number;
}

const fuseOptions = {
  keys: [
    { name: 'title', weight: 2 },
    { name: 'name', weight: 2 },
    { name: 'description', weight: 1 },
    { name: 'summary', weight: 1.5 },
    { name: 'technologies', weight: 1 },
    { name: 'content', weight: 1 },
    { name: 'category', weight: 0.5 },
  ],
  threshold: 0.4,
  includeScore: true,
};

export function useSearch() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchCategory>('all');

  const projectsFuse = useMemo(() => new Fuse(projects, fuseOptions), []);
  const skillsFuse = useMemo(() => new Fuse(skills, { ...fuseOptions, keys: ['name', 'description', 'category'] }), []);
  const aboutFuse = useMemo(() => new Fuse(aboutItems, { ...fuseOptions, keys: ['title', 'content'] }), []);

  const results = useMemo((): SearchResult[] => {
    if (!query.trim()) {
      // Return all items when no query
      const allResults: SearchResult[] = [];
      
      if (category === 'all' || category === 'projects') {
        projects.forEach(p => allResults.push({ item: p, type: 'project', score: 0 }));
      }
      if (category === 'all' || category === 'skills') {
        skills.forEach(s => allResults.push({ item: s, type: 'skill', score: 0 }));
      }
      if (category === 'all' || category === 'about') {
        aboutItems.forEach(a => allResults.push({ item: a, type: 'about', score: 0 }));
      }
      
      return allResults;
    }

    const searchResults: SearchResult[] = [];

    if (category === 'all' || category === 'projects') {
      projectsFuse.search(query).forEach(r => {
        searchResults.push({ item: r.item, type: 'project', score: r.score || 0 });
      });
    }

    if (category === 'all' || category === 'skills') {
      skillsFuse.search(query).forEach(r => {
        searchResults.push({ item: r.item, type: 'skill', score: r.score || 0 });
      });
    }

    if (category === 'all' || category === 'about') {
      aboutFuse.search(query).forEach(r => {
        searchResults.push({ item: r.item, type: 'about', score: r.score || 0 });
      });
    }

    return searchResults.sort((a, b) => a.score - b.score);
  }, [query, category, projectsFuse, skillsFuse, aboutFuse]);

  const search = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  const filterByCategory = useCallback((newCategory: SearchCategory) => {
    setCategory(newCategory);
  }, []);

  const feelingLucky = useCallback(() => {
    if (results.length > 0) {
      return results[0];
    }
    return null;
  }, [results]);

  return {
    query,
    category,
    results,
    search,
    filterByCategory,
    feelingLucky,
    totalResults: results.length,
  };
}
