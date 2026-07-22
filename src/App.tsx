import { useCallback, useEffect, useState } from "react";
import Background from "@/components/layout/Background";
import Filtering from "@/components/Filtering";
import Header from "@/components/layout/Header";
import StudentForm from "@/components/form/StudentForm";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import Students from "@/Student";
import { StudentFormData, Student as StudentType } from "@/types/Student";
import { createStudent } from "@/utils/studentUtils";
import { useLocalStorage } from "@/hooks/useLocalStorage";

function App() {
  // Persist students state across reloads. The `:v1` suffix is a
  // schema-version guard: bump to `:v2` if the Student shape ever changes
  // so old data is ignored instead of crashing on incompatible JSON.
  const [students, setStudents] = useLocalStorage<StudentType[]>(
    "labo4-filtering:students:v1",
    Students
  );
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingStudent, setEditingStudent] = useState<StudentType | null>(
    null
  );
  const [darkMode, setDarkMode] = useState<boolean>(true);
  // Deletion now goes through a confirmation dialog. Holding the ID
  // (not the full student) keeps the existing `onDelete: (id) => void`
  // signature unchanged everywhere — the resolve to a name happens
  // here in App, where the student list is already in scope.
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const addStudent = (formData: StudentFormData): void => {
    const newStudent = createStudent(formData);
    setStudents([...students, newStudent]);
  };

  const updateStudent = (formData: StudentFormData): void => {
    if (editingStudent) {
      const updatedStudent = createStudent(formData, editingStudent);
      setStudents(
        students.map((s) => (s.id === editingStudent.id ? updatedStudent : s))
      );
    }
  };

  // Used to be a single `deleteStudent` that filtered immediately.
  // Now split: `requestDeleteStudent` opens the confirm dialog,
  // `confirmDeleteStudent` actually filters. The functional setter
  // form of `setStudents((prev) => ...)` keeps `confirmDeleteStudent`
  // resilient against closure staleness — the ID is captured once
  // at the top of the handler.
  const requestDeleteStudent = (id: string): void => {
    setPendingDeleteId(id);
  };

  const cancelDelete = useCallback((): void => {
    setPendingDeleteId(null);
  }, []);

  const confirmDeleteStudent = (): void => {
    const id = pendingDeleteId;
    if (!id) {
      return;
    }
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setPendingDeleteId(null);
  };

  const handleEdit = (student: StudentType): void => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleCloseForm = useCallback((): void => {
    setShowForm(false);
    setEditingStudent(null);
  }, []);

  const handleSave = (formData: StudentFormData): void => {
    if (editingStudent) {
      updateStudent(formData);
    } else {
      addStudent(formData);
    }
    handleCloseForm();
  };

  // Single source of truth for "any modal is open right now" —
  // drives the `inert`/`aria-hidden` props on the main page wrapper
  // and ensures focus + Tab cannot leak to the background while
  // either dialog is up.
  const modalOpen = showForm || pendingDeleteId !== null;

  // Look up the student by ID on each render. Safe fallback when the
  // student was already removed (e.g. cross-tab sync via the
  // useLocalStorage hook): the dialog still closes cleanly via
  // onCancel or onConfirm even with `name` undefined.
  const pendingDeleteName = pendingDeleteId
    ? students.find((s) => s.id === pendingDeleteId)?.name
    : undefined;

  return (
    <div className="min-h-screen py-8 relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-500">
      <Background />

      {/* While ANY modal is open (add/edit form or delete confirmation),
          hide the main page from assistive tech and pull it out of the
          focus order so Tab cannot leak behind the dialog. `inert`
          covers focus + a11y tree in modern browsers; `aria-hidden`
          is the fallback for older engines. The combined `modalOpen`
          boolean keeps both flows consistent. */}
      <div
        className="relative container mx-auto px-4 z-10"
        inert={modalOpen || undefined}
        aria-hidden={modalOpen || undefined}
      >
        <Header
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />

        {/* Reset editingStudent before opening so a stray C-key (or
            a click) while editing another student doesn't re-open
            the form in update mode by accident. */}
        <Filtering
          students={students}
          onEdit={handleEdit}
          onDelete={requestDeleteStudent}
          onAddNew={() => {
            setEditingStudent(null);
            setShowForm(true);
          }}
        />
      </div>

      {showForm && (
        <StudentForm
          student={editingStudent}
          onSave={handleSave}
          onClose={handleCloseForm}
        />
      )}

      {/* ConfirmDelete dialog: rendered only when pendingDeleteId is
          set (i.e. after a StudentCard trash-click). The student
          name lookup is done here, not in ConfirmDialog, so the
          dialog stays unaware of the surrounding data model and can
          be reused for any future confirm-anything flow. */}
      {pendingDeleteId && (
        <ConfirmDialog
          title="Delete student"
          message={
            <>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                {pendingDeleteName ?? "this student"}
              </span>
              ? This action cannot be undone.
            </>
          }
          confirmLabel="Delete"
          variant="danger"
          onConfirm={confirmDeleteStudent}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default App;
