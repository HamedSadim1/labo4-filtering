import React from "react";

interface MetaTileProps {
  /** Decorative icon (e.g. `<FaBirthdayCake aria-hidden />`). */
  icon: React.ReactNode;
  /** Short label above the value (e.g. "Age" / "Year"). */
  label: string;
  /** Numeric value displayed prominently. */
  value: number;
  /** Unit string appended after the value (e.g. "yrs" / "programme"). */
  unit: string;
}

/**
 * Dashboard-style stat tile used inside StudentCard for the
 * Age + Year columns. Calls `e.stopPropagation()` on click so a
 * tap on the meta tile does not trigger the card-level "Edit"
 * handler, keeping the numbers text-selectable while the rest of
 * the card stays clickable.
 */
const MetaTile: React.FC<MetaTileProps> = ({ icon, label, value, unit }) => (
  <div
    onClick={(e) => e.stopPropagation()}
    className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/60 rounded-xl px-3 py-2.5 cursor-default"
  >
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 shadow-sm text-sm">
      {icon}
    </span>
    <div className="min-w-0">
      <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 leading-none">
        {label}
      </p>
      <p className="text-base font-bold text-slate-900 dark:text-white leading-tight">
        {value}{" "}
        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
          {unit}
        </span>
      </p>
    </div>
  </div>
);

export default MetaTile;
