import { useCallback, useState } from "react";
import { Student, SortField, SortOrder } from "@/types/Student";
import { filterStudents, sortStudents, toggleSortOrder } from "@/utils";

export interface UseFilterStateResult {
  /** Current search query text. */
  searchText: string;
  /** Setter for the search query. Passed to ControlBar → SearchBar. */
  setSearchText: (value: string) => void;
  /** Currently active sort field. */
  sortBy: SortField;
  /** Currently active sort order. */
  sortOrder: SortOrder;
  /**
   * Handler for sort-field changes:
   * - If the same field is clicked again → toggle sort order
   *   (asc ↔ desc via `toggleSortOrder`).
   * - If a different field is clicked → switch field + reset to asc.
   */
  handleSort: (field: SortField) => void;
  /**
   * The `students` array after applying filter and sort in sequence:
   * filter down to search matches first, then sort the result.
   */
  sortedStudents: Student[];
  /**
   * `true` when any filter is non-default — searchText is non-empty,
   * sortBy is not "name", or sortOrder is not "asc". Used by
   * ControlBar to conditionally show the Reset button.
   */
  filtersActive: boolean;
  /** Resets all search + sort state to defaults. */
  resetFilters: () => void;
}

/**
 * Encapsulates the user-interface filter + sort state shared between
 * the ControlBar (SearchBar + SortButtons) and the StudentGrid.
 *
 * Previously this logic (3 `useState` calls + 2 derived arrays +
 * `handleSort`) lived directly inside `Filtering.tsx`. Extracting it
 * to a hook makes the state testable in isolation and keeps the UI
 * component focused on composition.
 *
 * @param students — the full, unfiltered list from the parent (App).
 */
export const useFilterState = (students: Student[]): UseFilterStateResult => {
  const [searchText, setSearchText] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const filteredStudents = filterStudents(students, searchText);
  const sortedStudents = sortStudents(filteredStudents, sortBy, sortOrder);

  const handleSort = (field: SortField): void => {
    if (sortBy === field) {
      setSortOrder(toggleSortOrder(sortOrder));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const filtersActive = searchText !== "" || sortBy !== "name" || sortOrder !== "asc";

  const resetFilters = useCallback(() => {
    setSearchText("");
    setSortBy("name");
    setSortOrder("asc");
  }, []);

  return {
    searchText,
    setSearchText,
    sortBy,
    sortOrder,
    handleSort,
    sortedStudents,
    filtersActive,
    resetFilters,
  };
};
