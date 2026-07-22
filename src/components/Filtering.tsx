import React, { useEffect, useRef, useState } from "react";
import { Student, SortField, SortOrder } from "@/types/Student";
import { filterStudents, sortStudents, toggleSortOrder } from "@/utils";
import { useGlobalKeydown } from "@/hooks/useGlobalKeydown";
import AddStudentButton from "@/components/controls/AddStudentButton";
import SearchBar from "@/components/controls/SearchBar";
import SortButtons from "@/components/controls/SortButtons";
import StudentGrid from "@/components/students/StudentGrid";

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

  // Stable ref so the global `c` shortcut always calls the freshest
  // `onAddNew` (which App re-creates on every render) without
  // re-registering the listener on every render.
  const onAddNewRef = useRef(onAddNew);
  useEffect(() => {
    onAddNewRef.current = onAddNew;
  }, [onAddNew]);

  // Global `C` keyboard shortcut (mirrors the SearchBar `/` shortcut).
  // Modifier/editable guards live in `useGlobalKeydown` so both
  // call-sites share one implementation.
  useGlobalKeydown(["c", "C"], () => onAddNewRef.current?.());

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
