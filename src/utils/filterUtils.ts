import { Student } from "@/types/Student";
import { STUDENT_FIELDS } from "@/constants/students";

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
  // `STUDENT_FIELDS` is the single source of truth shared with
  // `sortUtils.ts` (re-exported there as SORT_FIELDS) so adding e.g.
  // a "grade" field lights up both filter AND sort simultaneously.
  const needle = searchText.toLowerCase();

  return students.filter((student) =>
    STUDENT_FIELDS.some((field) => {
      const value = student[field];
      const haystack =
        typeof value === "number" ? value.toString() : value.toLowerCase();
      return haystack.includes(needle);
    })
  );
};
