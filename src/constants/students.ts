import type { Student } from "@/types/Student";

/**
 * Fields of `Student` that participate in free-text search.
 * The `satisfies` clause ensures every entry is a real `keyof Student`
 * at compile time without widening the literal type — so future
 * additions automatically get a TypeScript error if a key is misspelled
 * or removed.
 */
export const SEARCHABLE_FIELDS = ["name", "age", "year"] as const satisfies readonly (keyof Student)[];
