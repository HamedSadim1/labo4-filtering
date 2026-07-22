import React from "react";
import { FaMoon, FaSun, FaUserGraduate } from "react-icons/fa";
import CardSurface from "./CardSurface";

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode }) => {
  return (
    <header className="mb-8">
      <CardSurface darkTone="900" padding="p-6 sm:p-8">
        {/* Title row: brand block (badge + title + tagline) on the left,
            dark-mode toggle anchored right. flex-wrap means the toggle
            drops below the brand block on narrow screens instead of
            overflowing; flex-1 + min-w-0 on the left lets the title
            truncate cleanly. Text-balance on the h1 keeps the wrap
            aesthetically balanced on phones. */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Brand badge: gradient rounded tile with a graduation-cap
                glyph. Echoes the per-card avatar gradient so the header
                and the grid below share visual language. Decorative,
                so aria-hidden for assistive tech. */}
            <span
              aria-hidden
              className="shrink-0 w-12 h-12 rounded-2xl bg-linear-to-br from-pink-500 via-purple-600 to-indigo-600 shadow-lg shadow-pink-500/30 text-white inline-flex items-center justify-center text-xl"
            >
              <FaUserGraduate />
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-4xl font-bold bg-linear-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight text-balance">
                Student Management System
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-0.5">
                Manage your students efficiently with modern design
              </p>
            </div>
          </div>

          {/* Dark-mode toggle: 48x48 button with cross-fade sun/moon.
              Both icons render inside the same button — opacity +
              rotate + scale swap the active one, so the toggle
              transition reads as deliberate rather than a hard swap.
              `motion-reduce:transition-none` honours the prefers-
              reduced-motion policy (matches the existing CSS block
              and the rule applied to StudentCard). `focusable={false}`
              keeps decorative SVGs out of the focus order in older
              engines. */}
          <button
            onClick={onToggleDarkMode}
            aria-label="Toggle dark mode"
            className="relative w-12 h-12 shrink-0 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300 shadow-sm border border-slate-200 dark:border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
          >
            <FaSun
              aria-hidden
              focusable={false}
              className={`absolute inset-0 m-auto text-lg transition-all duration-300 motion-reduce:transition-none ${
                darkMode
                  ? "opacity-100 rotate-0 scale-100 text-yellow-500"
                  : "opacity-0 -rotate-90 scale-50 pointer-events-none"
              }`}
            />
            <FaMoon
              aria-hidden
              focusable={false}
              className={`absolute inset-0 m-auto text-lg transition-all duration-300 motion-reduce:transition-none ${
                darkMode
                  ? "opacity-0 rotate-90 scale-50 pointer-events-none"
                  : "opacity-100 rotate-0 scale-100 text-indigo-600 dark:text-indigo-400"
              }`}
            />
          </button>
        </div>
      </CardSurface>
    </header>
  );
};

export default Header;
