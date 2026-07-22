import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode }) => {
  return (
    <header className="text-center mb-8">
      <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-4">
          <div aria-hidden="true" />
          <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent text-center">
            Student Management System
          </h1>
          <div className="flex justify-end">
            <button
              onClick={onToggleDarkMode}
              aria-label="Toggle dark mode"
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm border border-slate-200 dark:border-slate-700 focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:outline-none"
            >
              {darkMode ? (
                <FaSun className="text-yellow-500" />
              ) : (
                <FaMoon className="text-indigo-600" />
              )}
            </button>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-300">
          Manage your students efficiently with modern design
        </p>
      </div>
    </header>
  );
};

export default Header;
