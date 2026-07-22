import React from "react";
import { SortField, SortOrder } from "@/types/Student";
import { SORT_FIELDS } from "@/utils";

interface SortButtonsProps {
  sortBy: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

// Segmented control: a single rounded pill containing the three sort
// options. macOS / Stripe / Linear pattern. Each segment picks up
// `aria-pressed` so screen readers convey the current selection, and
// the active segment also gets the up/down arrow indicator. The
// background container is a soft slate so the active white-on-slate
// segment reads as a push-button without needing an explicit
// per-segment hover state — Tailwind handles the colour swap.
//
// `SORT_FIELDS` is sourced from `sortUtils.ts` so any future field
// addition lives in one place.
const SortButtons: React.FC<SortButtonsProps> = ({
  sortBy,
  sortOrder,
  onSort,
}) => {
  const labelFor = (field: SortField): string =>
    sortBy === field
      ? `Change ${field} sort to ${sortOrder === "asc" ? "descending" : "ascending"}`
      : `Sort by ${field} ascending`;

  return (
    <div
      role="group"
      aria-label="Sort students"
      className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 p-1 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-200"
    >
      {SORT_FIELDS.map((field) => {
        const isActive = sortBy === field;
        return (
          <button
            key={field}
            type="button"
            onClick={() => onSort(field)}
            aria-pressed={isActive}
            aria-label={labelFor(field)}
            className={`inline-flex items-center gap-1 px-4 sm:px-5 py-2.5 rounded-full text-sm sm:text-base font-semibold capitalize transition-colors duration-200 focus-ring ${
              isActive
                ? "bg-white dark:bg-slate-900 text-pink-600 dark:text-pink-300 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {field}
            {isActive && (
              <span aria-hidden="true" className="text-xs">
                {sortOrder === "asc" ? "↑" : "↓"}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default SortButtons;
