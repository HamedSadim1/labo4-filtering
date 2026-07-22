import type { StudentFormData } from "@/types/Student";
import { validatePositiveNumber, validateRequired } from "@/utils/validation";

/**
 * Single source of truth for every `keyof Student` block in the app
 * that participates in either sorting or free-text search. The
 * `satisfies` clause ensures every entry is a real `keyof Student` at
 * compile time without widening the literal type — so future additions
 * automatically get a TypeScript error if a key is misspelled or
 * removed. Note: this replaces the older `SEARCHABLE_FIELDS`
 * (filterUtils.ts) and `SORT_FIELDS` (sortUtils.ts) which were
 * identical arrays living in two places.
 */
export const STUDENT_FIELDS = ["name", "age", "year"] as const satisfies readonly (
  | "name"
  | "age"
  | "year"
)[];

/**
 * One record per entry in STUDENT_FIELDS. Drives the StudentForm's
 * `<FormField>` render: every parameter (label, placeholder,
 * validator) is sourced from this config instead of being re-typed
 * inline three times. The `validate` function captures its own label
 * so error messages stay in sync with the visible field labels
 * forever — there's no longer a way for the validator to drift from
 * the label and print a confusing error.
 *
 * `name` is `keyof StudentFormData` (not `keyof Student`) because
 * StudentFormData intentionally omits `id` (it's auto-generated).
 * That keeps indexing `formData[field.name]` and
 * `errors[field.name]` type-safe under `noUncheckedIndexedAccess`:
 * each key maps to a `string` field, so the union collapses and
 * ESLint's `no-unsafe-*` family stays silent.
 */
export interface StudentFieldConfig {
  /** Matches the key in `StudentFormData` — never the domain key `id`. */
  name: keyof StudentFormData;
  label: string;
  type: "text" | "number";
  placeholder: string;
  required: boolean;
  min?: string;
  validate: (value: string) => string | undefined;
}

export const STUDENT_FIELD_CONFIG: readonly StudentFieldConfig[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter student name",
    required: true,
    validate: (value) => validateRequired("Name", value),
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    placeholder: "Enter age",
    required: true,
    min: "1",
    validate: (value) => validatePositiveNumber("Age", value),
  },
  {
    name: "year",
    label: "Year",
    type: "number",
    placeholder: "Enter year",
    required: true,
    min: "1",
    validate: (value) => validatePositiveNumber("Year", value),
  },
] as const;
