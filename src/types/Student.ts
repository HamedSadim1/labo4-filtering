export interface Student {
  id: string;
  name: string;
  age: number;
  year: number;
}

export interface StudentFormData {
  name: string;
  age: string;
  year: string;
}

export type SortField = "name" | "age" | "year";
export type SortOrder = "asc" | "desc";
