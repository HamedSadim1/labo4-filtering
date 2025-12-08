import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode }) => {
  return (
    <header className="text-center mb-8">
      <div className="backdrop-blur-xl bg-black/20 dark:bg-black/30 rounded-2xl p-6 shadow-2xl border border-white/10 dark:border-white/5">
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-pink-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
            Student Management System
          </h1>
          <button
            onClick={onToggleDarkMode}
            className="backdrop-blur-sm bg-black/20 dark:bg-black/30 p-3 rounded-xl hover:bg-black/40 dark:hover:bg-black/50 transition-all duration-300 shadow-lg border border-white/10 dark:border-white/5"
          >
            {darkMode ? (
              <FaSun className="text-yellow-300" />
            ) : (
              <FaMoon className="text-slate-700" />
            )}
          </button>
        </div>
        <p className="text-white/80 dark:text-white/70">
          Manage your students efficiently with modern design
        </p>
      </div>
    </header>
  );
};

export default Header;
