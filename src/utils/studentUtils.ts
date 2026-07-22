import { generate as shortidGenerate } from "shortid";
import { Student, StudentFormData } from "@/types/Student";

/**
 * Generate a fresh unique student id. Uses `shortid` (already a project
 * dependency for the seed-data file at /Student.ts) so the live-app IDs
 * match the format and entropy of the seed data; `Date.now()` would
 * collide whenever `createStudent` runs twice within the same millisecond.
 */
export const generateStudentId = (): string => {
  return shortidGenerate();
};

export const createStudent = (
  formData: StudentFormData,
  existingStudent?: Student
): Student => {
  return {
    id: existingStudent?.id || generateStudentId(),
    name: formData.name,
    age: parseInt(formData.age),
    year: parseInt(formData.year),
  };
};

export const getStudentInitial = (name: string): string => {
  return name.charAt(0).toUpperCase();
};

// Curated palette of warm/cool hues that stay inside the brand's
// pink-purple-violet-indigo family so per-card accents never clash
// with the global pink/purple gradient on buttons or the modal.
const huePalette = [340, 282, 220, 196, 25, 312] as const;

export const getStudentHue = (name: string): number => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  // noUncheckedIndexedAccess widens palette[] to number | undefined;
  // the static fallback below keeps the return type narrowly `number`.
  return huePalette[hash % huePalette.length] ?? huePalette[0]!;
};
