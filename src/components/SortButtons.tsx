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
    return `backdrop-blur-xl px-4 py-2 rounded-2xl transition-all duration-300 shadow-xl border hover:scale-105 ${
      sortBy === field
        ? "bg-pink-500/80 text-white border-pink-400/50 shadow-pink-500/25"
        : "bg-white/10 dark:bg-black/10 text-white/80 border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/20"
    }`;
  };

  return (
    <div className="flex gap-3 mb-6 justify-center">
      <button onClick={() => onSort("name")} className={getButtonClass("name")}>
        Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
      </button>
      <button onClick={() => onSort("age")} className={getButtonClass("age")}>
        Age {sortBy === "age" && (sortOrder === "asc" ? "↑" : "↓")}
      </button>
      <button onClick={() => onSort("year")} className={getButtonClass("year")}>
        Year {sortBy === "year" && (sortOrder === "asc" ? "↑" : "↓")}
      </button>
    </div>
  );
};

export default SortButtons;
