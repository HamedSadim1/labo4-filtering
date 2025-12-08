import React, { useState } from "react";
import { Student, SortField, SortOrder } from "../types/Student";
import { filterStudents, sortStudents, toggleSortOrder } from "../utils";
import SearchBar from "./SearchBar";
import SortButtons from "./SortButtons";
import StudentGrid from "./StudentGrid";

interface FilteringProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

const Filtering: React.FC<FilteringProps> = ({
  students,
  onEdit,
  onDelete,
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

  return (
    <div>
      <SearchBar searchText={searchText} onSearchChange={setSearchText} />

      <SortButtons sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} />

      <StudentGrid
        students={sortedStudents}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default Filtering;
