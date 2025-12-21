'use client';

import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = "Tìm kiếm bài viết..." }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative max-w-4xl mx-auto mt-6">
      <form onSubmit={handleSubmit} className={`
        relative group
        transition-all duration-300
        ${isFocused ? 'scale-[1.02]' : ''}
      `}>
        {/* Search Input */}
        <div className={`
          relative overflow-hidden rounded-2xl
          bg-white/10 backdrop-blur-md border
          transition-all duration-300
          ${isFocused
            ? 'border-purple-500 shadow-lg shadow-purple-500/20'
            : 'border-slate-500 hover:border-white/30'
          }
        `}>
          <div className="flex items-center border-slate-400">
            {/* Search Icon */}
            <div className="pl-5 pr-2 pointer-events-none">
              <MagnifyingGlassIcon className={`
                w-5 h-5 transition-colors duration-200
                ${isFocused ? 'text-purple-400' : 'text-black/60'}
              `} />
            </div>

            {/* Input Field */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className="flex-1 px-2 py-4 bg-transparent text-black placeholder-black/40 focus:outline-none text-lg cursor-text border-slate-300"
              autoComplete="off"
              autoFocus={false}
            />

            {/* Clear Button */}
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="pr-5 pl-2 text-black/40 hover:text-black transition-colors duration-200"
                tabIndex={-1}
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Animated Border */}
          <div className={`
            absolute inset-0 rounded-2xl bg-gradient-to-r
            from-purple-500 to-pink-500 opacity-0
            transition-opacity duration-300
            pointer-events-none
            ${isFocused ? 'opacity-20' : ''}
          `} />
        </div>

        {/* Search Suggestions (could be implemented later) */}
        {isFocused && query && (
          <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl z-10">
            <p className="text-black/60 text-sm">Nhấn Enter để tìm kiếm "{query}"</p>
          </div>
        )}
      </form>
    </div>
  );
}