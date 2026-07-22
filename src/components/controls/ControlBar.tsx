import React from "react";
import { FaRedoAlt } from "react-icons/fa";
import { SortField, SortOrder } from "@/types/Student";
import SearchBar from "./SearchBar";
import SortButtons from "./SortButtons";
import CancelButton from "@/components/buttons/CancelButton";
import AddStudentButton from "./AddStudentButton";

interface ControlBarProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  sortBy: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  onAddNew: () => void;
  /** When `true`, a Reset button is shown to clear all filters. */
  filtersActive?: boolean;
  /** Fires when the user clicks Reset to clear filters. */
  onResetFilters?: () => void;
}

/**
 * Responsive control bar that sits above the StudentGrid. Composes
 * SearchBar (`flex-1`), SortButtons (segmented control), and
 * AddStudentButton (primary CTA) into a single row on `sm+`
 * viewports; stacks vertically on narrower screens.
 *
 * When filters are active (searchText not empty, or sort not on
 * name ascending), a slate-styled Reset button appears next to
 * the AddStudentButton so users can quickly clear all filter/sort
 * state.
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
  filtersActive,
  onResetFilters,
}) => (
  <nav
    aria-label="Search and filter controls"
    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6"
  >
    <SearchBar searchText={searchText} onSearchChange={onSearchChange} />
    <SortButtons sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />

    {filtersActive && onResetFilters && (
      <CancelButton onClick={onResetFilters}>
        <FaRedoAlt aria-hidden focusable={false} style={{ fontSize: "0.75rem" }} />
        {" "}Reset
      </CancelButton>
    )}

    <AddStudentButton onClick={onAddNew} />
  </nav>
);

export default ControlBar;
