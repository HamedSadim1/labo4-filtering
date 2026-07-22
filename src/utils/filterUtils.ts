import { Student } from "@/types/Student";
import { SEARCHABLE_FIELDS } from "@/constants/students";

export const filterStudents = (
  students: Student[],
  searchText: string
): Student[] => {
  if (!searchText.trim()) {
    return students;
  }

  // Lowercase the needle once. Each searchable field is normalised
  // the same way (string → lowercase, number → toString) so a query
  // like "jAcob" or "20" both work against name and age/year uniformly.
  const needle = searchText.toLowerCase();

  return students.filter((student) =>
    SEARCHABLE_FIELDS.some((field) => {
      const value = student[field];
      const haystack =
        typeof value === "number" ? value.toString() : value.toLowerCase();
      return haystack.includes(needle);
    })
  );
};
