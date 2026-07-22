import { Student } from "@/types/Student";

export const filterStudents = (
  students: Student[],
  searchText: string
): Student[] => {
  if (!searchText.trim()) {
    return students;
  }

  const searchLower = searchText.toLowerCase();

  return students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchLower) ||
      student.age.toString().includes(searchText) ||
      student.year.toString().includes(searchText)
  );
};
