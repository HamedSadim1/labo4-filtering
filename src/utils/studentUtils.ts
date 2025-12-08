import { Student, StudentFormData } from "../types/Student";

export const generateStudentId = (): string => {
  return Date.now().toString();
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

export const isValidStudentData = (formData: StudentFormData): boolean => {
  return !!(formData.name && formData.age && formData.year);
};
