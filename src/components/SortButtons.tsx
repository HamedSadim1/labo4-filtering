import React from "react";
import { SortField, SortOrder } from "../types/Student";

interface SortButtonsProps {
  sortBy: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

const SortButtons: React.FC<SortButtonsProps> = ({
  sortBy,
  sortOrder,
  onSort,
}) => {
  const getButtonClass = (field: SortField) => {
    const isActive = sortBy === field;
    return `px-4 py-2 rounded-2xl transition-all duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 ${
      isActive
        ? "bg-pink-500 text-white border border-pink-500 shadow-md shadow-pink-500/20 hover:bg-pink-600"
        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:-translate-y-0.5"
    }`;
  };

  const getSortLabel = (field: SortField) => {
    if (sortBy === field) {
      return `Change ${field} sort to ${sortOrder === "asc" ? "descending" : "ascending"}`;
    }
    return `Sort by ${field} ascending`;
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6 justify-center">
      <button
        onClick={() => onSort("name")}
        className={getButtonClass("name")}
        aria-label={getSortLabel("name")}
      >
        Name{" "}
        {sortBy === "name" && (
          <span aria-hidden="true">{sortOrder === "asc" ? "↑" : "↓"}</span>
        )}
      </button>
      <button
        onClick={() => onSort("age")}
        className={getButtonClass("age")}
        aria-label={getSortLabel("age")}
      >
        Age{" "}
        {sortBy === "age" && (
          <span aria-hidden="true">{sortOrder === "asc" ? "↑" : "↓"}</span>
        )}
      </button>
      <button
        onClick={() => onSort("year")}
        className={getButtonClass("year")}
        aria-label={getSortLabel("year")}
      >
        Year{" "}
        {sortBy === "year" && (
          <span aria-hidden="true">{sortOrder === "asc" ? "↑" : "↓"}</span>
        )}
      </button>
    </div>
  );
};

export default SortButtons;
