'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Fuse, { type FuseResult } from 'fuse.js';
import { docsIndex, type DocSection } from '../../lib/docsIndex';
import { Search, FileText } from 'lucide-react';

type SearchResult = FuseResult<DocSection>;

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const fuseRef = useRef<Fuse<DocSection> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Fuse.js search engine
  useEffect(() => {
    fuseRef.current = new Fuse(docsIndex, {
      keys: [
        { name: 'title', weight: 0.7 },
        { name: 'content', weight: 0.3 },
      ],
      includeScore: true,
      minMatchCharLength: 2,
      threshold: 0.4,
    });
  }, []);

  // Keyboard shortcut (Cmd+K) to focus input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Perform search when query changes
  useEffect(() => {
    if (query.length > 1 && fuseRef.current) {
      const searchResults = fuseRef.current.search(query).slice(0, 8);
      setResults(searchResults);
      setIsOpen(searchResults.length > 0 || query.length > 1);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }, [query]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || results.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < results.length) {
            handleResultClick(results[selectedIndex].item);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          inputRef.current?.blur();
          break;
      }
    },
    [isOpen, results, selectedIndex]
  );

  // Handle result click
  const handleResultClick = (item: DocSection) => {
    const element = document.querySelector(item.path);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 80; // 80px offset for header
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setIsOpen(false);
    setQuery('');
    inputRef.current?.blur();
  };

  // Truncate match for cleaner preview
  const highlightMatch = (text: string) => {
    return text.substring(0, 70) + (text.length > 70 ? '...' : '');
  };

  return (
    <div className="relative max-w-2xl mx-auto z-50" ref={dropdownRef}>
      {/* Search Input Container */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/80 pointer-events-none transition-colors duration-200 z-10" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search documentation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.length > 1) setIsOpen(true);
          }}
          className="w-full pl-12 pr-20 py-3 font-sans bg-background dark:bg-zinc-900/50 backdrop-blur-sm border border-border rounded-md shadow-sm text-foreground placeholder:text-muted-foreground placeholder:opacity-80 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary hover:border-primary/50 hover:shadow-md"
          aria-label="Search documentation"
        />
        {/* Keyboard Shortcut Hint */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-xs text-muted-foreground/90 bg-muted/80 backdrop-blur-sm px-2 py-1 rounded-md pointer-events-none">
          ⌘K
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute w-full mt-2 bg-background dark:bg-zinc-900/90 backdrop-blur-sm border border-border rounded-md shadow-md overflow-hidden z-50">
          {results.length > 0 ? (
            <>
              <div className="p-2 border-b border-border/50">
                <p className="text-xs font-semibold text-muted-foreground/90 px-2 tracking-wide">RESULTS</p>
              </div>
              <div className="max-h-[400px] overflow-y-auto p-1" role="listbox" id="search-results">
                {results.map((result, index) => (
                  <button
                    key={result.item.id}
                    onClick={() => handleResultClick(result.item)}
                    className={`w-full text-left px-3 py-2.5 flex items-center gap-3 rounded-lg ${
                      index === selectedIndex
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-muted/30'
                    } transition-colors duration-200 ease-out !shadow-none hover:!shadow-none focus:ring-2 focus:ring-primary focus:outline-none`}
                    role="option"
                    aria-selected={index === selectedIndex}
                  >
                    <FileText className="w-4 h-4 text-muted-foreground/80 flex-shrink-0" />
                    <div className="flex-grow overflow-hidden">
                      <div className="font-medium text-sm truncate font-sans">{result.item.title}</div>
                      <div className="text-xs text-muted-foreground truncate opacity-80">{highlightMatch(result.item.content)}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="p-6 text-center">
              <Search className="h-8 w-8 mx-auto mb-3 opacity-40 text-muted-foreground" />
              <p className="font-semibold text-foreground font-sans">No results found</p>
              <p className="text-sm text-muted-foreground mt-1 opacity-80">Try a different search term.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}