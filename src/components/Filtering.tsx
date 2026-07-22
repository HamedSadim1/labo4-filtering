import React, { useEffect, useRef, useState } from "react";
import { Student, SortField, SortOrder } from "../types/Student";
import { filterStudents, sortStudents, toggleSortOrder } from "../utils";
import AddStudentButton from "./AddStudentButton";
import SearchBar from "./SearchBar";
import SortButtons from "./SortButtons";
import StudentGrid from "./StudentGrid";

interface FilteringProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

// Unified control bar (search flex-1 + sort segmented + add right)
// sits above the grid. Wrapper goes column on narrow screens and
// row at `sm+`. The header at `sm:` baseline-alignment keeps the
// search input, segmented control, and primary button visually
// centered against each other.
const Filtering: React.FC<FilteringProps> = ({
  students,
  onEdit,
  onDelete,
  onAddNew,
}) => {
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

  // Stable ref so the global keydown handler always calls the
  // freshest `onAddNew` (which App re-creates on every render)
  // without re-attaching the listener each render. Assigned
  // during render directly — no useEffect needed, no lint warning.
  // Stable ref so the global keydown handler always calls the
  // freshest `onAddNew` (which App re-creates on every render)
  // without re-attaching the listener each render. The ref is
  // updated in a deps-aware `useEffect` because React 19's hooks
  // rule disallows assigning `ref.current` directly during the
  // render cycle (the prior ref-during-render attempt tripped
  // this and failed lint).
  const onAddNewRef = useRef(onAddNew);
  useEffect(() => {
    onAddNewRef.current = onAddNew;
  }, [onAddNew]);

  // Global `C` keyboard shortcut: opens the add-student form when
  // no input/textarea/contentEditable is already focused and the
  // key isn't part of a chord (Ctrl/Meta/Alt). Mirrors the
  // shortcut pattern SearchBar uses for `/`.
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (
        (event.key !== "c" && event.key !== "C") ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey
      ) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName?.toLowerCase();
        const editable =
          tag === "input" || tag === "textarea" || target.isContentEditable;
        if (editable) {
          return;
        }
      }
      event.preventDefault();
      onAddNewRef.current?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        <SearchBar searchText={searchText} onSearchChange={setSearchText} />
        <SortButtons sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} />
        <AddStudentButton onClick={onAddNew} />
      </div>

      <StudentGrid
        students={sortedStudents}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default Filtering;
