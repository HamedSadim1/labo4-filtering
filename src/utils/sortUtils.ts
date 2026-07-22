import { Student, SortField, SortOrder } from "@/types/Student";

/**
 * The canonical list of sort options for the segmented control in
 * `SortButtons.tsx`. Kept as a `SORT_FIELDS` export so that the
 * existing barrel-import in `SortButtons.tsx` keeps working
 * (`import { SORT_FIELDS } from "@/utils"`), but the array itself
 * lives in `@/constants/students.ts` and is now the single source of
 * truth — both sort and search consume the same list, so adding a
 * "grade" field, for example, lights up sorting AND searching
 * simultaneously.
 */
export { STUDENT_FIELDS as SORT_FIELDS } from "@/constants/students";

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
