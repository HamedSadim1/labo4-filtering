import React, { useEffect, useRef } from "react";
import { Student } from "@/types/Student";
import { useFilterState } from "@/hooks/useFilterState";
import { useGlobalKeydown } from "@/hooks/useGlobalKeydown";
import ControlBar from "@/components/controls/ControlBar";
import StudentGrid from "@/components/students/StudentGrid";

interface FilteringProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

/**
 * Orchestrator for the filtering + sorting + display pipeline.
 * Delegates state management to `useFilterState`, the control-bar
 * layout to `ControlBar`, and the grid rendering to `StudentGrid`.
 *
 * The only logic that remains here is the global `C` keyboard
 * shortcut (which needs a stable ref to avoid re-registering the
 * listener every time `onAddNew` changes).
 */
const Filtering: React.FC<FilteringProps> = ({
  students,
  onEdit,
  onDelete,
  onAddNew,
}) => {
  const {
    searchText,
    setSearchText,
    sortBy,
    sortOrder,
    handleSort,
    sortedStudents,
  } = useFilterState(students);

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
      <ControlBar
        searchText={searchText}
        onSearchChange={setSearchText}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        onAddNew={onAddNew}
      />
      <StudentGrid
        students={sortedStudents}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default Filtering;
