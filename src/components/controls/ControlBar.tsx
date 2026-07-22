import React from "react";
import { SortField, SortOrder } from "@/types/Student";
import SearchBar from "./SearchBar";
import SortButtons from "./SortButtons";
import AddStudentButton from "./AddStudentButton";

interface ControlBarProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  sortBy: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  onAddNew: () => void;
}

/**
 * Responsive control bar that sits above the StudentGrid. Composes
 * SearchBar (`flex-1`), SortButtons (segmented control), and
 * AddStudentButton (primary CTA) into a single row on `sm+`
 * viewports; stacks vertically on narrower screens.
 *
 * Pure composition — no state, no side effects. Every prop is
 * forwarded from the parent `Filtering` component (which in turn
 * sources state from `useFilterState`).
 */
const ControlBar: React.FC<ControlBarProps> = ({
  searchText,
  onSearchChange,
  sortBy,
  sortOrder,
  onSort,
  onAddNew,
}) => (
  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
    <SearchBar searchText={searchText} onSearchChange={onSearchChange} />
    <SortButtons sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
    <AddStudentButton onClick={onAddNew} />
  </div>
);

export default ControlBar;
