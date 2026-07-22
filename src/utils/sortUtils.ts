import { Student, SortField, SortOrder } from "@/types/Student";

/**
 * The canonical list of sort options, exposed for the segmented control
 * in `SortButtons.tsx`. Order here is the visual order on the bar.
 * Declared `readonly` so consumers can't mutate the shared array at runtime.
 */
export const SORT_FIELDS: readonly SortField[] = ["name", "age", "year"] as const;

type Comparator = (a: Student, b: Student) => number;

// Each entry is a factory that closes over the SortOrder so the comparator
// itself stays a clean `(a, b) => number`. Because each factory accesses only
// the matching field on Student (e.g. `a.name` is `string`, `a.age` is
// `number`), no `any`/union-narrowing is needed and the previous `as string`
// cast disappears. The `Record<SortField, ...>` shape means accessing
// `[sortBy]` is type-safe under `noUncheckedIndexedAccess` because every key
// of SortField is statically present.
const COMPARATORS: Record<SortField, (order: SortOrder) => Comparator> = {
  name: (order) => (a, b) => {
    const compareResult = a.name
      .toLowerCase()
      .localeCompare(b.name.toLowerCase());
    return order === "asc" ? compareResult : -compareResult;
  },
  age: (order) => (a, b) => (order === "asc" ? a.age - b.age : b.age - a.age),
  year: (order) => (a, b) => (order === "asc" ? a.year - b.year : b.year - a.year),
};

export const sortStudents = (
  students: Student[],
  sortBy: SortField,
  sortOrder: SortOrder
): Student[] => {
  return [...students].sort(COMPARATORS[sortBy](sortOrder));
};

export const toggleSortOrder = (currentOrder: SortOrder): SortOrder => {
  return currentOrder === "asc" ? "desc" : "asc";
};
