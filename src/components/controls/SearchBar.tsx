import React, { useEffect, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

interface SearchBarProps {
  searchText: string;
  onSearchChange: (value: string) => void;
}

// `flex-1` lets the SearchBar fill the available width inside the
// unified control bar (see Filtering.tsx). The right side surfaces
// either a `kbd` hint chip (`/`) when empty, or a clear `×` button
// when there's text — both share the same horizontal slot so the
// input width never shifts.
const SearchBar: React.FC<SearchBarProps> = ({ searchText, onSearchChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Global `/` keyboard shortcut. Comfortable pattern (used by
  // GitHub, Linear, Vercel) — pressing `/` while no input/textarea/
  // contentEditable element is focused jumps straight to the search
  // field without a click.
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName?.toLowerCase();
        const editable =
          tag === "input" || tag === "textarea" || target.isContentEditable;
        if (editable) {
          return;
        }
      }
      event.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative group flex-1 min-w-0">
      <FaSearch
        aria-hidden
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-pink-500 transition-colors"
      />
      <input
        ref={inputRef}
        id="search"
        name="search"
        type="text"
        placeholder="Search students..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search students (press /)"
        autoComplete="off"
        className="w-full pl-12 pr-16 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300 shadow-sm hover:shadow-md"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
        {searchText ? (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
          >
            <FaTimes aria-hidden focusable={false} />
          </button>
        ) : (
          <kbd
            aria-hidden
            className="hidden sm:inline-flex items-center justify-center min-w-7 h-6 px-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 select-none"
          >
            /
          </kbd>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
