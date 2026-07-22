import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  searchText: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  onSearchChange,
}) => {
  return (
    <div className="mb-6">
      <div className="relative group">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors group-focus-within:text-pink-500" />
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Search students..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search students"
          autoComplete="off"
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300 shadow-sm hover:shadow-md"
        />
      </div>
    </div>
  );
};

export default SearchBar;
