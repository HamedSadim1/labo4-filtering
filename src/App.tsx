import { useCallback, useEffect, useState } from "react";
import Background from "@/components/layout/Background";
import Filtering from "@/components/Filtering";
import Header from "@/components/layout/Header";
import StudentForm from "@/components/form/StudentForm";
import Students from "@/Student";
import { StudentFormData, Student as StudentType } from "@/types/Student";
import { createStudent } from "@/utils/studentUtils";

function App() {
  const [students, setStudents] = useState<StudentType[]>(Students);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingStudent, setEditingStudent] = useState<StudentType | null>(
    null
  );
  const [darkMode, setDarkMode] = useState<boolean>(true);

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

  const deleteStudent = (id: string): void => {
    setStudents(students.filter((s) => s.id !== id));
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

  return (
    <div className="min-h-screen py-8 relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-500">
      <Background />

      {/* While the modal is open, hide the main page from assistive tech
          and pull it out of the focus order so Tab cannot leak behind the
          dialog. `inert` covers focus + a11y tree in modern browsers;
          `aria-hidden` is the fallback for older engines. */}
      <div
        className="relative container mx-auto px-4 z-10"
        inert={showForm || undefined}
        aria-hidden={showForm ? true : undefined}
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
          onDelete={deleteStudent}
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
    </div>
  );
}

export default App;
