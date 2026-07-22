import React from "react";

type DarkTone = "800" | "900";

interface CardSurfaceProps {
  /** Which slate tone to use in dark mode. Header uses 900 (deep), EmptyState uses 800 (mid). */
  darkTone?: DarkTone;
  /** Tailwind padding utility classes. Defaults to `p-6`. */
  padding?: string;
  /** Extra utilities to merge (e.g. text-align, margin). */
  className?: string;
  children: React.ReactNode;
}

const DARK_BG_CLASS: Record<DarkTone, string> = {
  "800": "dark:bg-slate-800/70",
  "900": "dark:bg-slate-900/70",
};

const DARK_BORDER_CLASS: Record<DarkTone, string> = {
  "800": "dark:border-slate-700",
  "900": "dark:border-slate-800",
};

/**
 * Translucent card surface with backdrop blur and rounded corners.
 * Centralises the look shared by the page Header and the EmptyState so
 * a future re-theme touches one component, not two.
 */
const CardSurface: React.FC<CardSurfaceProps> = ({
  darkTone = "800",
  padding = "p-6",
  className = "",
  children,
}) => (
  <div
    className={[
      "backdrop-blur-xl bg-white/70",
      DARK_BG_CLASS[darkTone],
      "rounded-3xl shadow-xl border border-slate-200",
      DARK_BORDER_CLASS[darkTone],
      padding,
      className,
    ]
      .filter(Boolean)
      .join(" ")}
  >
    {children}
  </div>
);

export default CardSurface;
