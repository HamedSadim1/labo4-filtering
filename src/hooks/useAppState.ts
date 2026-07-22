import { useCallback, useEffect, useState } from "react";
import { Student as StudentType, StudentFormData } from "@/types/Student";
import { createStudent } from "@/utils/studentUtils";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Students from "@/Student";

export interface UseAppStateResult {
  /** Current student list (persisted via useLocalStorage). */
  students: StudentType[];
  /** Whether the add/edit form modal is visible. */
  showForm: boolean;
  /** The student currently being edited, or `null` for a new student. */
  editingStudent: StudentType | null;
  /** Whether dark mode is active (stored as React state + toggling
   *  the `dark` class on `<html>`). */
  darkMode: boolean;
  /** Non-null when the delete confirmation dialog is open. */
  pendingDeleteId: string | null;
  /** Derived: `true` when **any** modal (form or confirm) is visible.
   *  Used by App's `inert` prop to pull the page out of the focus
   *  order. */
  modalOpen: boolean;
  /** Derived: student name for the pending delete confirmation, or
   *  `undefined` when the student was already removed (e.g. via
   *  cross-tab sync). */
  pendingDeleteName: string | undefined;

  // ── Handlers ─────────────────────────────────────────────────

  toggleDarkMode: () => void;
  /** Opens the form in edit mode for the given student. */
  handleEdit: (student: StudentType) => void;
  /** Closes the form (clears showForm + editingStudent). */
  handleCloseForm: () => void;
  /** Saves the form data — creates a new student if `editingStudent`
   *  is `null`, otherwise updates the existing one. */
  handleSave: (formData: StudentFormData) => void;
  /** Opens the delete confirmation dialog for the given student ID. */
  requestDeleteStudent: (id: string) => void;
  /** Closes the delete confirmation without removing the student. */
  cancelDelete: () => void;
  /** Confirms the deletion — filters the student array and closes
   *  the dialog. Uses a functional state-setter for the array so
   *  closure staleness is not a concern. */
  confirmDeleteStudent: () => void;
  /** Opens the form in **add** mode (resets editingStudent to null). */
  handleAddNew: () => void;
}

/**
 * Encapsulates the entire top-level state and CRUD logic previously
 * spread across ~130 lines of App.tsx. The hook:
 *
 * - Manages `students` (via `useLocalStorage`), `showForm`,
 *   `editingStudent`, `darkMode`, and `pendingDeleteId`.
 * - Provides stable memoised handlers via `useCallback`.
 * - Owns the dark-mode class toggle effect.
 * - Computes derived values (`modalOpen`, `pendingDeleteName`).
 *
 * App.tsx calls this hook once and destructures the result into its
 * JSX — no inline state, no inline handlers, no useEffect.
 */
export const useAppState = (): UseAppStateResult => {
  // ── State ─────────────────────────────────────────────────────

  const [students, setStudents] = useLocalStorage<StudentType[]>(
    "labo4-filtering:students:v1",
    Students
  );
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentType | null>(
    null
  );
  const [darkMode, setDarkMode] = useState(true);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  // ── Side effects ──────────────────────────────────────────────

  useEffect(() => {
    const method = darkMode ? "add" : "remove";
    document.documentElement.classList[method]("dark");
  }, [darkMode]);

  // ── Handlers ──────────────────────────────────────────────────

  const toggleDarkMode = useCallback(() => setDarkMode((prev) => !prev), []);

  const handleEdit = useCallback((student: StudentType) => {
    setEditingStudent(student);
    setShowForm(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingStudent(null);
  }, []);

  const handleSave = useCallback(
    (formData: StudentFormData) => {
      if (editingStudent) {
        const updated = createStudent(formData, editingStudent);
        setStudents((prev) =>
          prev.map((s) => (s.id === editingStudent.id ? updated : s))
        );
      } else {
        const newStudent = createStudent(formData);
        setStudents((prev) => [...prev, newStudent]);
      }
      handleCloseForm();
    },
    [editingStudent, setStudents, handleCloseForm]
  );

  const requestDeleteStudent = useCallback((id: string) => {
    setPendingDeleteId(id);
  }, []);

  const cancelDelete = useCallback(() => {
    setPendingDeleteId(null);
  }, []);

  const confirmDeleteStudent = useCallback(() => {
    const id = pendingDeleteId;
    if (!id) {
      return;
    }
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setPendingDeleteId(null);
  }, [pendingDeleteId, setStudents]);

  const handleAddNew = useCallback(() => {
    setEditingStudent(null);
    setShowForm(true);
  }, []);

  // ── Derived values ────────────────────────────────────────────

  const modalOpen = showForm || pendingDeleteId !== null;

  const pendingDeleteName = pendingDeleteId
    ? students.find((s) => s.id === pendingDeleteId)?.name
    : undefined;

  return {
    students,
    showForm,
    editingStudent,
    darkMode,
    pendingDeleteId,
    modalOpen,
    pendingDeleteName,
    toggleDarkMode,
    handleEdit,
    handleCloseForm,
    handleSave,
    requestDeleteStudent,
    confirmDeleteStudent,
    cancelDelete,
    handleAddNew,
  };
};
