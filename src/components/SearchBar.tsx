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
      <div className="relative">
        <FaSearch className="absolute left-4 top-4 text-white/60 dark:text-white/40 z-10" />
        <input
          type="text"
          placeholder="Search students..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/50 text-white placeholder-white/50 transition-all duration-300 shadow-2xl"
        />
      </div>
    </div>
  );
};

export default SearchBar;
